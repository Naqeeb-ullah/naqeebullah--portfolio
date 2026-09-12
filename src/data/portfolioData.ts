export interface PortfolioData {
  identity: {
    fullName: string;
    professionalName: string;
    primaryTitle: string;
    secondaryTitle: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    githubUsername: string;
    resumeUrl: string;
  };
  summary: string;
  about: string;
  education: Array<{
    degree: string;
    institution: string;
    duration: string;
    status: string;
  }>;
  skills: Record<string, string[]>;
  training: Array<{
    provider: string;
    programs: string[];
    note: string;
  }>;
  experience: Array<{
    org: string;
    role: string;
    status: string;
  }>;
  certifications: Array<{
    provider: string;
    title: string;
    url: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    tech: string[];
  }>;
  aiLab: {
    heading: string;
    subtitle: string;
    focusAreas: string[];
  };
  availability: string;
}

export const VERIFIED_PORTFOLIO_DATA: PortfolioData = {
  identity: {
    fullName: "Naqeeb Ullah Mohammadi",
    professionalName: "Naqeeb Ullah",
    primaryTitle: "Full-Stack Web Developer",
    secondaryTitle: "Full-Stack Web Developer | React Developer | AI Enthusiast",
    location: "Quetta, Balochistan, Pakistan",
    email: "naqeeb.webdev@gmail.com",
    phone: "+92 315 5689645",
    linkedin: "https://linkedin.com/in/naqeeb-ullah-muhammadi-aa8496365",
    github: "https://github.com/GITHUB_USERNAME",
    githubUsername: "GITHUB_USERNAME",
    resumeUrl: ""
  },
  summary: "Hi, I'm Naqeeb Ullah, a Full-Stack Web Developer from Quetta, Balochistan, Pakistan. I build modern, responsive and user-focused web applications using React, JavaScript, Tailwind CSS, Node.js, Express.js and modern backend technologies. I am also expanding my expertise in Artificial Intelligence, AI-powered applications and Agentic AI.",
  about: "I started my journey in web development with frontend technologies and modern UI design. Over time, I expanded my skills toward backend development, APIs, authentication, databases and full-stack application development. Today, I am also exploring Artificial Intelligence and Agentic AI to build smarter and more useful digital experiences. I'm not claiming years of senior-level experience — I'm a motivated developer who learns in public and ships practical projects along the way.",
  education: [
    {
      degree: "FSc (Pre-Engineering)",
      institution: "Government Boys Inter College",
      duration: "2018–2020",
      status: "FSc Cleared"
    }
  ],
  skills: {
    "Frontend": ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Responsive Web Design", "UI/UX"],
    "Backend": ["Node.js", "Express.js", "REST APIs", "Backend Development"],
    "Database & Backend Services": ["Supabase", "Authentication", "Database Integration", "Storage"],
    "Authentication": ["JWT", "Supabase Auth", "Secure Authentication Concepts"],
    "Tools": ["Git", "GitHub", "VS Code", "Vite", "Netlify", "Vercel"],
    "AI": ["Google Gemini API", "AI Chatbots", "AI-Powered Applications", "AI Agents", "Agentic AI", "Modern AI Concepts"]
  },
  training: [
    {
      provider: "Saylani Mass IT Training",
      programs: ["Frontend Web Development", "Web & Mobile App Development"],
      note: "Currently learning Agentic AI"
    },
    {
      provider: "SMIT",
      programs: ["Web Development / IT Web Development"],
      note: ""
    },
    {
      provider: "Internee.pk",
      programs: ["Web Development Internship — Completed"],
      note: "Internship certificate received"
    },
    {
      provider: "Cisco Networking Academy",
      programs: ["Introduction to Modern AI"],
      note: ""
    },
    {
      provider: "JWT",
      programs: ["JWT Authentication (course / self-learning)"],
      note: ""
    }
  ],
  experience: [
    { org: "Internee.pk", role: "Web Development Internship", status: "Completed" },
    { org: "Saylani Mass IT Training", role: "Web Development Training", status: "Currently learning Agentic AI" },
    { org: "SMIT", role: "Web Development / IT Training", status: "Completed" },
    { org: "Cisco Networking Academy", role: "Introduction to Modern AI", status: "Completed" }
  ],
  certifications: [
    { provider: "Cisco Networking Academy", title: "Introduction to Modern AI", url: "" },
    { provider: "Saylani Mass IT Training", title: "Frontend Web Development", url: "" },
    { provider: "Saylani Mass IT Training", title: "Web & Mobile App Development", url: "" },
    { provider: "SMIT", title: "IT Web Development", url: "" },
    { provider: "Internee.pk", title: "Internship Certificate", url: "" }
  ],
  projects: [
    {
      id: "explore-balochistan",
      title: "Explore Balochistan",
      description: "A React-based tourism web application highlighting Balochistan's destinations, including Ziarat, Kund Malir, Hingol and Gwadar.",
      tech: ["React", "Tailwind CSS", "Modern UI", "Responsive Design"]
    },
    {
      id: "discover-quetta",
      title: "Discover Quetta",
      description: "A modern web experience focused on Quetta's culture, people and destinations.",
      tech: ["React", "Tailwind CSS", "Responsive Design"]
    },
    {
      id: "naqeeb-news",
      title: "Naqeeb News",
      description: "A modern news website project.",
      tech: ["React", "Tailwind CSS"]
    },
    {
      id: "dropvault",
      title: "DropVault",
      description: "A modern file-sharing / file-management web project.",
      tech: ["React", "Node.js", "Supabase"]
    },
    {
      id: "ai-chatbot-projects",
      title: "AI Chatbot Projects",
      description: "AI-powered chatbot experiments using modern AI APIs.",
      tech: ["React", "Node.js", "Google Gemini API"]
    }
  ],
  aiLab: {
    heading: "AI Lab",
    subtitle: "Exploring how AI can make software smarter, more useful and more human-centered.",
    focusAreas: ["AI Agents", "AI Chatbots", "Gemini API", "Agentic AI", "AI-powered web applications", "Automation experiments"]
  },
  availability: "Open to freelance work, internships and remote junior/mid Full-Stack opportunities."
};

export const SYSTEM_INSTRUCTION_PROMPT = `You are "Naqeeb AI", the portfolio assistant for Naqeeb Ullah Mohammadi (goes by "Naqeeb Ullah").

Your ONLY job is to answer visitor questions about Naqeeb using the VERIFIED DATA below. This data is the complete and only source of truth about him.

STRICT RULES (never break these):
- Never invent or guess jobs, companies, clients, salaries, degrees, certifications, awards, projects, experience, or skills that are not explicitly listed in the verified data below.
- If someone asks about something not covered in the verified data, respond exactly with: "I don't have verified information about that yet." Do not speculate beyond that.
- Do not claim Naqeeb is a "senior" developer or exaggerate his experience. He is a motivated, growing Full-Stack Web Developer who is also learning AI and Agentic AI.
- Keep answers concise, warm and professional — a few sentences, not long essays, unless the user asks for detail.
- You may lightly rephrase the verified data in natural language, but do not contradict it.
- If asked for contact details or availability, share the verified email, phone, LinkedIn and availability note.
- If asked something unrelated to Naqeeb or his portfolio, politely redirect the conversation back to Naqeeb's skills, projects, education or availability.

VERIFIED DATA (JSON):
${JSON.stringify(VERIFIED_PORTFOLIO_DATA, null, 2)}`;

export const SUGGESTED_QUESTIONS = [
  "What is Naqeeb currently learning?",
  "What projects has Naqeeb built?",
  "What are Naqeeb's contact details and availability?",
  "Tell me about Naqeeb's background and education",
  "What technologies and tools does Naqeeb use?",
  "Does Naqeeb have a job at Google?"
];
