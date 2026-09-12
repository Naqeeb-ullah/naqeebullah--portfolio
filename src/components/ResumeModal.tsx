import React from "react";
import { VERIFIED_PORTFOLIO_DATA } from "../data/portfolioData.js";
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, CheckCircle2, Award, GraduationCap, Briefcase, Code2 } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { identity, summary, about, education, skills, training, experience, certifications, projects, availability } = VERIFIED_PORTFOLIO_DATA;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative my-8 overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Verified Authentic CV
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document */}
        <div id="printable-resume" className="space-y-6">
          
          {/* Header */}
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {identity.fullName}
            </h1>
            <p className="text-sm sm:text-base font-medium text-emerald-700 mt-1">
              {identity.secondaryTitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {identity.location}
              </span>
              <span>•</span>
              <a href={`mailto:${identity.email}`} className="text-emerald-700 hover:underline flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                {identity.email}
              </a>
              <span>•</span>
              <a href={`tel:${identity.phone}`} className="hover:underline flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                {identity.phone}
              </a>
              <span>•</span>
              <a href={identity.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-slate-400" />
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(skills).map(([category, list]) => (
                <div key={category} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-900 block mb-1">{category}:</span>
                  <span className="text-slate-600 leading-relaxed">{list.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Verified Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l-2 border-emerald-500 pl-3 py-0.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      {proj.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {proj.description}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">
                    Tech: {proj.tech.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Training */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Education
              </h2>
              {education.map((edu, idx) => (
                <div key={idx} className="text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block">{edu.degree}</span>
                  <span className="text-slate-600 block">{edu.institution}</span>
                  <span className="text-slate-500 mt-1 block">Duration: {edu.duration} • Status: {edu.status}</span>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Certifications & Training
              </h2>
              <div className="space-y-2 text-xs">
                {training.slice(0, 3).map((t, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block">{t.provider}</span>
                    <span className="text-slate-600">{t.programs.join(", ")}</span>
                    {t.note && <span className="text-emerald-700 block font-medium mt-0.5 text-[11px]">({t.note})</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Availability Note */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
            <span className="font-bold">Availability: </span>
            {availability}
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
