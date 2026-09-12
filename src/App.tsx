import React, { useState } from "react";
import { Header } from "./components/Header.js";
import { PortfolioView } from "./components/PortfolioView.js";
import { ChatAssistant } from "./components/ChatAssistant.js";
import { AIStudioGuide } from "./components/AIStudioGuide.js";
import { ContactModal } from "./components/ContactModal.js";
import { ResumeModal } from "./components/ResumeModal.js";
import { ProjectModal, ProjectItem } from "./components/ProjectModal.js";
import { VERIFIED_PORTFOLIO_DATA } from "./data/portfolioData.js";
import { Bot, Sparkles, ShieldCheck } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"portfolio" | "assistant" | "aistudio">("portfolio");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);

  const handleAskAI = (query: string) => {
    setPendingQuery(query);
    setActiveTab("assistant");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans transition-colors antialiased selection:bg-emerald-500/20 selection:text-emerald-800">
      
      {/* Navigation & Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Area with pure white background */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white">
        {activeTab === "portfolio" && (
          <PortfolioView
            onAskAI={handleAskAI}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {activeTab === "assistant" && (
          <ChatAssistant
            initialQuery={pendingQuery}
            onQueryConsumed={() => setPendingQuery(null)}
          />
        )}

        {activeTab === "aistudio" && (
          <AIStudioGuide
            onRunTest={(query) => {
              setPendingQuery(query);
              setActiveTab("assistant");
            }}
          />
        )}
      </main>

      {/* Persistent Floating Quick-Access to Naqeeb AI if on another tab */}
      {activeTab !== "assistant" && (
        <aside aria-label="Quick Access Assistant" className="fixed bottom-6 right-6 z-30">
          <button
            id="btn-floating-ai"
            onClick={() => setActiveTab("assistant")}
            className="group px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-900/15 flex items-center gap-2.5 transition-all hover:scale-105"
          >
            <div className="relative">
              <Bot className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></span>
            </div>
            <div className="text-left">
              <div className="text-xs font-bold leading-tight flex items-center gap-1">
                <span>Ask Naqeeb AI</span>
                <Sparkles className="w-3 h-3" />
              </div>
              <div className="text-[10px] text-emerald-100 opacity-90 leading-tight">
                Verified Assistant
              </div>
            </div>
          </button>
        </aside>
      )}

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onAskAI={handleAskAI}
      />

      {/* Verified CV / Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Contact Modal with vCard download */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">
              {VERIFIED_PORTFOLIO_DATA.identity.professionalName}
            </span>
            <span>•</span>
            <span>{VERIFIED_PORTFOLIO_DATA.identity.primaryTitle}</span>
            <span>•</span>
            <span>{VERIFIED_PORTFOLIO_DATA.identity.location}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-medium text-slate-600">Strict Grounded Truth: Verified Portfolio Data Only</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
