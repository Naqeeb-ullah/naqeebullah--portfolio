import React, { useState } from "react";
import { 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  Code
} from "lucide-react";
import { SYSTEM_INSTRUCTION_PROMPT } from "../data/portfolioData.js";

interface AIStudioGuideProps {
  onRunTest: (query: string) => void;
}

export const AIStudioGuide: React.FC<AIStudioGuideProps> = ({ onRunTest }) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const testCases = [
    {
      title: "Current Learning Test",
      query: "What is Naqeeb currently learning?",
      expected: "Saylani Mass IT Training (SMIT) & Agentic AI, modern AI applications.",
      type: "positive" as const,
    },
    {
      title: "Projects Test",
      query: "What projects has Naqeeb built?",
      expected: "Lists Explore Balochistan, Discover Quetta, Naqeeb News, DropVault, and AI Chatbots.",
      type: "positive" as const,
    },
    {
      title: "Contact & Availability Test",
      query: "What are his contact details and availability?",
      expected: "Shares email, phone (+92 315 5689645), LinkedIn, and freelance/internship note.",
      type: "positive" as const,
    },
    {
      title: "Negative Test (Google Employment)",
      query: "Does Naqeeb have a job at Google?",
      expected: "Must answer: 'I don't have verified information about that yet.'",
      type: "negative" as const,
    },
    {
      title: "Negative Test (Salary / Rate)",
      query: "What is Naqeeb's salary or hourly rate?",
      expected: "Must answer: 'I don't have verified information about that yet.'",
      type: "negative" as const,
    },
    {
      title: "Irrelevant Topic Redirection",
      query: "What is the capital of France?",
      expected: "Politely redirects back to Naqeeb's skills, projects, or availability.",
      type: "redirect" as const,
    },
  ];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(SYSTEM_INSTRUCTION_PROMPT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 bg-white text-slate-900">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>Google AI Studio Verification & Testing Protocol</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          How to Test Naqeeb AI in Google AI Studio
        </h2>

        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Follow the verified 5-step instructions below to test the portfolio assistant directly in Google AI Studio, or run interactive prompt tests directly inside this application.
        </p>
      </div>

      {/* 5-Step Testing Protocol & Live Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Steps List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>AI Studio 5-Step Instructions</span>
          </h3>

          <ol className="space-y-4 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-xs flex-shrink-0 text-slate-800">
                1
              </span>
              <div>
                <span className="font-semibold block mb-0.5 text-slate-900">Open Google AI Studio:</span>
                Go to{" "}
                <a
                  href="https://aistudio.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  aistudio.google.com <ExternalLink className="w-3 h-3" />
                </a>{" "}
                and click <strong>Create new prompt</strong> (Chat mode).
              </div>
            </li>

            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-xs flex-shrink-0 text-slate-800">
                2
              </span>
              <div>
                <span className="font-semibold block mb-0.5 text-slate-900">Paste System Instructions:</span>
                Copy the complete verified prompt below and paste it into the <strong>System instructions</strong> box in AI Studio.
              </div>
            </li>

            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-xs flex-shrink-0 text-slate-800">
                3
              </span>
              <div>
                <span className="font-semibold block mb-0.5 text-slate-900">Test Positive Verified Queries:</span>
                Type verified questions like <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">What is Naqeeb currently learning?</code>
              </div>
            </li>

            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-xs flex-shrink-0 text-slate-800">
                4
              </span>
              <div>
                <span className="font-semibold block mb-0.5 text-slate-900">Confirm Negative Rule Compliance:</span>
                Type unverified questions like <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">Does Naqeeb have a job at Google?</code>. Confirm it responds strictly with: <br />
                <span className="italic text-emerald-700 font-semibold">
                  &quot;I don&apos;t have verified information about that yet.&quot;
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-xs flex-shrink-0 text-slate-800">
                5
              </span>
              <div>
                <span className="font-semibold block mb-0.5 text-slate-900">Connect Gemini API Key:</span>
                Obtain your API key from{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  aistudio.google.com/app/apikey <ExternalLink className="w-3 h-3" />
                </a>{" "}
                and configure it in the environment as <code>GEMINI_API_KEY</code>.
              </div>
            </li>
          </ol>
        </div>

        {/* Live Test Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Interactive Verification Matrix</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Click &quot;Run in Naqeeb AI&quot; on any test case to verify strict rule enforcement live:
            </p>

            <div className="space-y-3">
              {testCases.map((tc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900">
                        {tc.title}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                          tc.type === "positive"
                            ? "bg-emerald-100 text-emerald-800"
                            : tc.type === "negative"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {tc.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-700 font-mono text-[11px]">
                      &quot;{tc.query}&quot;
                    </p>
                    <p className="text-slate-500 text-[10px] mt-0.5">
                      Expected: {tc.expected}
                    </p>
                  </div>

                  <button
                    onClick={() => onRunTest(tc.query)}
                    className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-xs text-xs"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run in Naqeeb AI</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* System Instruction Prompt Inspector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Code className="w-5 h-5 text-emerald-600" />
              <span>Complete System Instruction Prompt</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Contains the exact prompt, guardrails, and verified portfolio JSON.
            </p>
          </div>

          <button
            onClick={handleCopyPrompt}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto shadow-xs"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Full Prompt for AI Studio</span>
              </>
            )}
          </button>
        </div>

        <div className="relative">
          <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto max-h-80 border border-slate-800 leading-relaxed">
            {SYSTEM_INSTRUCTION_PROMPT}
          </pre>
        </div>
      </div>

    </div>
  );
};
