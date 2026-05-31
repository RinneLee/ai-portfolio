const { getSystemPrompt } = require('./data.js');

// In-memory rate limiting map (Tracks IP addresses)
const rateLimitMap = new Map();
const LIMIT = 15; // Max messages per window
const WINDOW_MS = 60 * 1000; // 1 minute window

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1. RATE LIMITING SECURITY
  // Extract client IP (Vercel uses x-forwarded-for)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
  const currentTime = Date.now();
  
  if (rateLimitMap.has(ip)) {
    const clientData = rateLimitMap.get(ip);
    if (currentTime - clientData.startTime < WINDOW_MS) {
      if (clientData.count >= LIMIT) {
        return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
      }
      clientData.count++;
    } else {
      // Reset window
      rateLimitMap.set(ip, { count: 1, startTime: currentTime });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, startTime: currentTime });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // 2. AI RESPONSE STREAMING
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: getSystemPrompt() },
          { role: 'user', content: message }
        ],
        stream: true, // Enabled Streaming
        temperature: 0.65 // Added interpretive creativity boost
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'Failed to fetch from DeepSeek');
    }

    // Set Server-Sent Events (SSE) headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Pipe the data chunks directly to the client as they arrive
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        res.end();
        break;
      }
      res.write(decoder.decode(value));
    }

  } catch (error) {
    console.error('Serverless Function Error:', error);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.end();
    }
  }
};
