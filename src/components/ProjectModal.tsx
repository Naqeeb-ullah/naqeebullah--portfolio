import React from "react";
import { X, Bot, Code2, Compass, Database, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
}

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onAskAI: (query: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onAskAI,
}) => {
  if (!project) return null;

  const getProjectIcon = (id: string) => {
    if (id.includes("balochistan") || id.includes("quetta")) {
      return <Compass className="w-6 h-6 text-teal-600" />;
    }
    if (id.includes("ai")) {
      return <Sparkles className="w-6 h-6 text-emerald-600" />;
    }
    if (id.includes("vault")) {
      return <Database className="w-6 h-6 text-indigo-600" />;
    }
    return <Code2 className="w-6 h-6 text-blue-600" />;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs">
            {getProjectIcon(project.id)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified Project
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 text-sm leading-relaxed mb-5">
          <span className="font-semibold text-slate-900 block mb-1">Project Overview:</span>
          {project.description}
        </div>

        {/* Technologies Used */}
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Technologies & Frameworks
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Ask Naqeeb AI Action */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onAskAI(`Tell me all details about the project ${project.title}`);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Bot className="w-4 h-4" />
            <span>Ask Naqeeb AI About This Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
