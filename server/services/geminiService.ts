import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, VERIFIED_DATA } from "./portfolioContext.js";

let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Verified fallback engine ensuring 100% compliance with strict rules
 * when GEMINI_API_KEY is not configured or in offline/development state.
 */
function verifiedFallbackAnswer(question: string): string {
  const q = question.toLowerCase().trim();

  // Negative / Unverified queries check (Strict Rule: "I don't have verified information about that yet.")
  const unverifiedKeywords = [
    "google", "amazon", "microsoft", "apple", "meta", "netflix", "uber", "salary",
    "senior", "lead", "architect", "master", "phd", "bachelor", "degree in computer science",
    "years of experience", "10 years", "5 years", "car", "married", "age", "religion",
    "crypto", "bitcoin", "investment", "net worth", "hourly rate", "wife", "children",
    "hackathon winner", "stanford", "mit", "harvard"
  ];

  for (const word of unverifiedKeywords) {
    if (q.includes(word)) {
      return "I don't have verified information about that yet.";
    }
  }

  // Unrelated questions -> politely redirect
  if (
    q.includes("weather") ||
    q.includes("recipe") ||
    q.includes("president") ||
    q.includes("movie") ||
    q.includes("capital of") ||
    (q.includes("who is") && !q.includes("naqeeb"))
  ) {
    return "I am Naqeeb AI, dedicated specifically to answering questions about Naqeeb Ullah's skills, projects, education, and availability. Please feel free to ask about his web development work or how to collaborate with him!";
  }

  // Contact / Availability
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("hire") ||
    q.includes("available") ||
    q.includes("reach") ||
    q.includes("linkedin") ||
    q.includes("github")
  ) {
    return `Naqeeb is based in ${VERIFIED_DATA.identity.location} and is ${VERIFIED_DATA.availability.toLowerCase()} You can contact him directly via email at ${VERIFIED_DATA.identity.email}, by phone at ${VERIFIED_DATA.identity.phone}, or connect on LinkedIn at ${VERIFIED_DATA.identity.linkedin}.`;
  }

  // What is he currently learning?
  if (
    q.includes("currently learning") ||
    q.includes("learning now") ||
    q.includes("studying") ||
    (q.includes("learning") && q.includes("what"))
  ) {
    return "Naqeeb is currently learning Agentic AI through Saylani Mass IT Training (SMIT) and expanding his expertise in Artificial Intelligence, AI-powered applications, and modern AI concepts.";
  }

  // Projects
  if (q.includes("project") || q.includes("portfolio") || q.includes("built") || q.includes("work")) {
    const list = VERIFIED_DATA.projects
      .map(p => `• ${p.title}: ${p.description} (Tech: ${p.tech.join(", ")})`)
      .join("\n");
    return `Naqeeb has built several practical projects including:\n${list}`;
  }

  // Skills / Tech stack
  if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("frontend") || q.includes("backend") || q.includes("react") || q.includes("node")) {
    return `Naqeeb is a Full-Stack Web Developer skilled in Frontend (HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Responsive Design), Backend (Node.js, Express.js, REST APIs), Database & Services (Supabase, Auth, Storage), Authentication (JWT, Supabase Auth), Tools (Git, GitHub, VS Code, Vite, Netlify, Vercel), and AI (Google Gemini API, AI Chatbots, AI Agents, and Agentic AI).`;
  }

  // Education & Training
  if (q.includes("education") || q.includes("degree") || q.includes("fsc") || q.includes("college") || q.includes("school") || q.includes("train") || q.includes("certif")) {
    return `Naqeeb completed his FSc (Pre-Engineering) from Government Boys Inter College (2018–2020). He has completed web development training and internships with Saylani Mass IT Training (SMIT), Internee.pk (certificate received), and Cisco Networking Academy (Introduction to Modern AI).`;
  }

  // Who is Naqeeb / About / Summary
  if (q.includes("who is") || q.includes("about") || q.includes("summary") || q.includes("intro") || q.includes("tell me about")) {
    return `${VERIFIED_DATA.summary} ${VERIFIED_DATA.about}`;
  }

  // AI Lab
  if (q.includes("ai lab") || q.includes("ai agent") || q.includes("gemini")) {
    return `In his AI Lab, Naqeeb explores how AI can make software smarter and more human-centered, focusing on AI Agents, AI Chatbots, Google Gemini API, Agentic AI, AI-powered web applications, and automation experiments.`;
  }

  // Default fallback for anything outside verified data
  return "I don't have verified information about that yet.";
}

export async function askNaqeebAI(message: string, history: ChatMessage[] = []): Promise<{ text: string; source: "gemini" | "verified-fallback" }> {
  const trimmed = message.trim();
  if (!trimmed) {
    return { text: "Hello! How can I help you learn about Naqeeb Ullah's work and skills today?", source: "verified-fallback" };
  }

  const ai = getGenAI();

  if (ai) {
    try {
      // Build conversation contents preserving history
      const formattedContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

      for (const h of history.slice(-6)) {
        formattedContents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        });
      }

      formattedContents.push({
        role: "user",
        parts: [{ text: trimmed }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2, // Low temperature for high factual accuracy and strict adherence
        },
      });

      const responseText = response.text?.trim();
      if (responseText) {
        return { text: responseText, source: "gemini" };
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to verified rule engine:", err);
    }
  }

  // Grounded rule engine fallback
  const fallbackText = verifiedFallbackAnswer(trimmed);
  return { text: fallbackText, source: "verified-fallback" };
}
