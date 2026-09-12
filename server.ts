import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { SYSTEM_INSTRUCTION, VERIFIED_DATA } from "./server/services/portfolioContext.js";
import { askNaqeebAI } from "./server/services/geminiService.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      model: "gemini-3.8-flash",
    });
  });

  app.get("/api/portfolio", (_req, res) => {
    res.json(VERIFIED_DATA);
  });

  app.get("/api/system-prompt", (_req, res) => {
    res.json({
      systemInstruction: SYSTEM_INSTRUCTION,
      howToTest: [
        "1. Go to https://aistudio.google.com and open 'Create new prompt' (Chat mode).",
        "2. Paste this ENTIRE system instruction into the 'System instructions' box.",
        "3. In the chat box, type any questions (e.g. 'What is Naqeeb currently learning?').",
        "4. Confirm it answers only from verified data and replies 'I don't have verified information about that yet.' for unlisted facts (e.g. 'Does Naqeeb have a job at Google?').",
        "5. Put your API key in Settings > Secrets or server environment as GEMINI_API_KEY."
      ],
    });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      if (!message || typeof message !== "string") {
        res.status(400).json({ error: "Message is required and must be a string." });
        return;
      }

      const result = await askNaqeebAI(message, history);
      res.json({
        reply: result.text,
        source: result.source,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Chat endpoint error:", error);
      res.status(500).json({
        reply: "I encountered an error processing your request. Please try again.",
        error: String(error),
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Naqeeb AI] Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
