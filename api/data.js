const profileData = {
  personal: {
    name: "Calvin Lee",
    location: "WP. Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
    linkedin: "https://www.linkedin.com/in/calvin-lee-370382229/",
    email: "calvinlee123456@gmail.com",
    languages: ["English", "Malay", "Japanese", "Cantonese"],
    hobbies: ["Gaming", "Gardening", "Fishing", "Travelling"]
  },
  professional: {
    roles: [
      {
        company: "Maybank",
        title: "Mainframe Developer (Assembler and Cobol Developer)",
        duration: "Mar 2023 - Present",
        type: "Full-time, On-site",
        description: "Collaborates across multiple internal teams using Agile methodologies to identify developer pain points and implement strategic solutions for complex architectural flows."
      },
      {
        company: "Maybank",
        title: "Back End Developer",
        duration: "Mar 2023 - Mar 2024",
        description: "Focused on internal automation and cross-team integrations."
      },
      {
        company: "Egate Messaging",
        title: "Intern",
        duration: "Feb 2022 - Mar 2023",
        description: "Gained foundational IT and infrastructure experience at a Microsoft product company, assisting with the installation of Microsoft services and server configurations."
      }
    ],
    education: [
      "Bachelor of Engineering - BE, Information Technology, The University of Queensland (2020 - 2021)",
      "Bachelor's degree, Information Technology, HELP University (Aug 2018 - Dec 2021)"
    ]
  },
  technical: {
    mainframe: ["JCL", "COBOL", "Assembler"],
    web_and_backend: ["HTML", "CSS", "JavaScript", "PHP"],
    ai_and_side_projects: ["Node.js", "Python", "Direct LLM APIs"],
    databases: ["SQL", "NoSQL (MongoDB)", "Supabase"]
  },
  projects: [
    {
      name: "Maybank SAFE (Core Banking System)",
      description: "Manages an essential internal core banking system responsible for the real-time checking, validation, and alignment of diverse financial products and high-volume transactions."
    },
    {
      name: "Maybank AI Implementation",
      description: "Acted as a primary tester to push, test, and implement AI usage directly inside Maybank's core banking systems."
    },
    {
      name: "Internal Automation & Monitoring Websites",
      description: "Developed real-time monitoring tools mapping Mainframe-to-Open-System data transfers and overnight program runtimes, optimizing efficiency and unblocking workflows for over 200 developers."
    }
  ],
  creative_and_games: [
    {
      name: "Melo Studio",
      description: "A creative side project involving the use of AI to autonomously compose, produce, and generate music entirely from scratch."
    },
    {
      name: "Direct API LLM Integration",
      description: "Implemented raw capabilities from models like Llama, Deepseek, Kimi, and Qwen directly into custom applications, including an AI Question Guessing Game and a Google Cloud-hosted Discord AI."
    },
    {
      name: "Interactive Web Games",
      description: "Built browser-based projects like 'An Imposter Game' and 'Slice' to experiment with multiplayer real-time sockets and rendering mechanics."
    }
  ],
  interview_context: {
    quote: "I view AI as a force multiplier. Instead of spending hours writing syntax from scratch, I utilize advanced AI tools to handle foundational coding. This allows me to focus my energy on what matters most: high-level program planning, architectural logic, and ensuring the project aligns perfectly with business goals.",
    strength: "His core strength is 'connecting the dots'—identifying architectural bottlenecks and creatively bridging the gaps between legacy mainframes and modern open systems using AI and robust logic.",
    motivation: "Having built a strong foundation in a highly regulated mainframe environment, he is looking to transition fully into modern open systems to build scalable, real-time backend architectures.",
    legacy_vs_modern: "Coding in low-level Assembler taught him extreme memory optimization, where small efficiencies exponentially impact large-scale systems. In modern high-level languages, he achieves efficiency through modular execution (running only necessary components) and rigorous upfront architectural planning to prevent costly mid-project changes.",
    ai_security: "In banking, he utilizes enterprise-operated internal copies of major LLMs (Gemini, Claude, GPT) to ensure compliance. When testing external models, he strictly sanitizes inputs by using mock data and test code placeholders to completely eliminate the risk of production leaks.",
    system_design: "He deeply understands resource management across different paradigms. He contrasts mainframe environments (which handle highly secure, event-driven single requests like balance inquiries) with his multiplayer game architectures (which manage continuous, resource-heavy websocket streams for real-time player positioning)."
  }
};

function getSystemPrompt() {
  return `You are a professional, intelligent AI assistant representing Calvin Lee's portfolio. You are directly embedded into his website.
  Answer questions about Calvin using ONLY this provided context:
  
  - Name: ${profileData.personal.name} (${profileData.personal.location})
  - LinkedIn: ${profileData.personal.linkedin}
  - Email: ${profileData.personal.email}
  - Languages: ${profileData.personal.languages.join(", ")}
  - Hobbies: ${profileData.personal.hobbies.join(", ")}
  
  - Current Role: ${profileData.professional.roles[0].title} at ${profileData.professional.roles[0].company} (${profileData.professional.roles[0].duration})
  - Past Experience: 
  ${profileData.professional.roles.slice(1).map(r => `  * ${r.title} at ${r.company} (${r.duration}): ${r.description}`).join("\n")}
  
  - Education: 
  ${profileData.professional.education.map(e => `  * ${e}`).join("\n")}
  
  - Technical Stack:
    * Mainframe: ${profileData.technical.mainframe.join(", ")}
    * Web/Backend: ${profileData.technical.web_and_backend.join(", ")}
    * AI/Side Projects: ${profileData.technical.ai_and_side_projects.join(", ")}
    * Databases: ${profileData.technical.databases.join(", ")}
  
  - Core Infrastructure Projects: 
  ${profileData.projects.map(p => `  * ${p.name}: ${p.description}`).join("\n")}

  - Creative AI & Games:
  ${profileData.creative_and_games.map(p => `  * ${p.name}: ${p.description}`).join("\n")}
  
  - Behavioral Interview Context & Technical Philosophy:
    * Calvin's Programming Philosophy: "${profileData.interview_context.quote}"
    * Greatest Strength: ${profileData.interview_context.strength}
    * Reason for looking for new roles: ${profileData.interview_context.motivation}
    * Legacy vs. Modern Code: ${profileData.interview_context.legacy_vs_modern}
    * AI Security & Data Privacy: ${profileData.interview_context.ai_security}
    * Real-Time System Design: ${profileData.interview_context.system_design}
  
  If a user asks a question that cannot be answered using the information above, politely explain that you are an AI focused strictly on Calvin's professional portfolio and do not have that information. Keep your tone helpful, modern, confident, and concise.
  
  IMPORTANT FORMATTING RULES: 
  1. If the user asks for Calvin's LinkedIn, you MUST provide it as a markdown link like this: [LinkedIn Profile](${profileData.personal.linkedin})
  2. If the user asks to email or contact him, provide his email as a mailto link like this: [Email Calvin](mailto:${profileData.personal.email})
  3. If asked about his strengths, philosophy, technical depth, or why he is moving roles, confidently summarize the Behavioral Interview Context provided.
  4. Format your responses with bullet points and bold text where appropriate to make it easily readable for a busy recruiter.`;
}

// Export using CommonJS
module.exports = { profileData, getSystemPrompt };