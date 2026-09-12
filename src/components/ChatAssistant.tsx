import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw, 
  Copy, 
  Check, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Download,
  Trash2,
  Lock
} from "lucide-react";
import { SYSTEM_INSTRUCTION_PROMPT } from "../data/portfolioData.js";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: string;
  timestamp: string;
}

interface ChatAssistantProps {
  initialQuery?: string | null;
  onQueryConsumed?: () => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  initialQuery,
  onQueryConsumed,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro-1",
      role: "assistant",
      content: `Hello! I am **Naqeeb AI**, an assistant strictly grounded in the verified portfolio and professional background of **Naqeeb Ullah Mohammadi**.\n\nYou can ask me about his:\n- **Technical Skills & Stack** (React, Tailwind, Node.js, Express, MongoDB, Supabase, JWT)\n- **Completed Projects** (Explore Balochistan, Discover Quetta, Naqeeb News, DropVault, AI Chatbots)\n- **Current Learning** (Saylani Mass IT Training / SMIT — Agentic AI)\n- **Education & Certifications** (FSc Pre-Engineering, Internee.pk, Cisco Networking Academy)\n- **Availability & Contact Details** (+92 315 5689645, naqeeb.webdev@gmail.com)\n\n*Note: Following strict rules, I will never speculate or invent details.*`,
      source: "verified-grounding",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [rulesExpanded, setRulesExpanded] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialTriggerRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    { label: "What is Naqeeb currently learning?", type: "positive" },
    { label: "What projects has Naqeeb built?", type: "positive" },
    { label: "What are his contact details and availability?", type: "positive" },
    { label: "Negative Test: Does Naqeeb have a job at Google?", type: "negative" },
    { label: "Negative Test: What is Naqeeb's salary or rate?", type: "negative" },
  ];

  const handleSend = async (userText: string) => {
    const text = userText.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "I don't have verified information about that yet.",
        source: data.source,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      // Fallback message following strict rules
      const fallbackMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "I don't have verified information about that yet.",
        source: "verified-fallback",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery && !initialTriggerRef.current) {
      initialTriggerRef.current = true;
      handleSend(initialQuery);
      if (onQueryConsumed) onQueryConsumed();
    }
  }, [initialQuery]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Web Speech API Text-to-Speech synthesis
  const handleSpeak = (id: string, text: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown characters like ** or #
    const cleanText = text.replace(/[*#_`]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleReset = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingId(null);
    setMessages([
      {
        id: "intro-reset",
        role: "assistant",
        content: `Conversation reset. I am Naqeeb AI, ready to answer questions about Naqeeb Ullah's verified portfolio, skills, projects, and availability!`,
        source: "verified-fallback",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const handleExportChat = () => {
    const transcript = messages
      .map((m) => `[${m.timestamp}] ${m.role.toUpperCase()}:\n${m.content}\n`)
      .join("\n---\n\n");
    const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Naqeeb_AI_Transcript_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-[calc(100vh-140px)] min-h-[600px] bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Assistant Header & Grounding Rules Bar */}
      <div className="px-5 py-3.5 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs flex-shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Naqeeb AI
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified Grounding
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Grounded strictly in verified portfolio data • Powered by Gemini 3.8 Flash
            </p>
          </div>
        </div>

        {/* Action Controls: Guardrails Toggle, Export, Clear */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRulesExpanded(!rulesExpanded)}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Inspect strict rules"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Strict Rules</span>
            {rulesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleExportChat}
            className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
            title="Export chat transcript"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
            title="Clear and reset chat"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Guardrail Rules Panel */}
      {rulesExpanded && (
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 text-xs text-slate-700 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-start gap-2 mb-2 font-bold text-slate-900">
            <ShieldAlert className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Enforced Strict Guardrails (Zero Hallucination Guarantee):</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] leading-relaxed text-slate-600 pl-6 list-disc">
            <li>Must only state verified facts present in Naqeeb&apos;s portfolio data.</li>
            <li>For unverified facts, MUST answer exactly: <em>&quot;I don&apos;t have verified information about that yet.&quot;</em></li>
            <li>Never claim senior status, imaginary employment (e.g. Google, Meta), or unlisted skills.</li>
            <li>Provide verified contact details and availability when inquired.</li>
          </ul>
        </div>
      )}

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-white">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-600">
                {m.role === "user" ? "You" : "Naqeeb AI"}
              </span>
              <span>•</span>
              <span>{m.timestamp}</span>
              {m.source && (
                <>
                  <span>•</span>
                  <span className="text-emerald-700 font-medium">
                    {m.source === "gemini" ? "Gemini 3.8 Flash" : "Verified Source"}
                  </span>
                </>
              )}
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs relative group ${
                m.role === "user"
                  ? "bg-slate-900 text-white rounded-tr-xs"
                  : "bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs"
              }`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>

              {/* Message Action Bar (Copy & Voice Speak) */}
              {m.role === "assistant" && (
                <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    {/* Speak TTS Button */}
                    <button
                      onClick={() => handleSpeak(m.id, m.content)}
                      className={`px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] transition-colors ${
                        speakingId === m.id
                          ? "bg-emerald-600 text-white font-semibold animate-pulse"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                      }`}
                      title={speakingId === m.id ? "Stop voice reading" : "Listen aloud"}
                    >
                      {speakingId === m.id ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      <span>{speakingId === m.id ? "Playing Voice..." : "Listen"}</span>
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(m.id, m.content)}
                      className="px-2 py-0.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-200 flex items-center gap-1 transition-colors"
                      title="Copy message"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-400">Verified</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-600">Naqeeb AI</span>
              <span>•</span>
              <span className="text-emerald-700">Checking verified rules...</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 text-xs text-slate-500 shadow-xs flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>Generating verified grounded response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">Suggested:</span>
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q.label.replace(/^Negative Test: /, ""))}
            className={`text-[11px] px-3 py-1 rounded-full whitespace-nowrap transition-colors flex items-center gap-1 font-medium ${
              q.type === "negative"
                ? "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <span>{q.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Naqeeb's projects, skills, training, or availability..."
          disabled={isLoading}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
