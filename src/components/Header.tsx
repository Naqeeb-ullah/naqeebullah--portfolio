import React from "react";
import { VERIFIED_PORTFOLIO_DATA } from "../data/portfolioData.js";
import { 
  Bot, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  CheckCircle2, 
  Terminal,
  Code2,
  FileText,
  Sparkles
} from "lucide-react";

interface HeaderProps {
  activeTab: "portfolio" | "assistant" | "aistudio";
  setActiveTab: (tab: "portfolio" | "assistant" | "aistudio") => void;
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenContact,
  onOpenResume,
}) => {
  const { identity, availability } = VERIFIED_PORTFOLIO_DATA;

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Identity & Verified Status */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                NU
              </div>
              <div 
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center"
                title="Verified Grounded Profile"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {identity.professionalName}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Verified Grounding
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-2 mt-0.5">
                <span className="font-medium text-slate-800">{identity.primaryTitle}</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {identity.location}
                </span>
              </p>
            </div>
          </div>

          {/* Navigation Controls & Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <nav className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                id="tab-portfolio"
                onClick={() => setActiveTab("portfolio")}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === "portfolio"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Portfolio</span>
              </button>

              <button
                id="tab-assistant"
                onClick={() => setActiveTab("assistant")}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 relative ${
                  activeTab === "assistant"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Naqeeb AI</span>
                <span className={`inline-flex items-center px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                  activeTab === "assistant" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800"
                }`}>
                  Chat
                </span>
              </button>

              <button
                id="tab-aistudio"
                onClick={() => setActiveTab("aistudio")}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === "aistudio"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-blue-600" />
                <span>AI Studio Test</span>
              </button>
            </nav>

            {/* Resume Button */}
            <button
              id="btn-open-resume"
              onClick={onOpenResume}
              className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap"
              title="View Verified CV / Resume"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">CV / Resume</span>
              <span className="sm:hidden">CV</span>
            </button>

            {/* Contact Button */}
            <button
              id="btn-open-contact"
              onClick={onOpenContact}
              className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>

        </div>

        {/* Verified Availability Pill Banner */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-800">Verified Availability:</span>
            <span className="text-slate-600">{availability}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${identity.email}`}
              className="hover:text-emerald-700 flex items-center gap-1 transition-colors text-slate-600"
            >
              <Mail className="w-3 h-3 text-slate-400" />
              <span>{identity.email}</span>
            </a>
            <span>•</span>
            <a
              href={`tel:${identity.phone}`}
              className="hover:text-emerald-700 flex items-center gap-1 transition-colors text-slate-600"
            >
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{identity.phone}</span>
            </a>
            <span>•</span>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 flex items-center gap-1 transition-colors text-slate-600"
            >
              <Linkedin className="w-3 h-3 text-slate-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

      </div>
    </header>
  );
};
