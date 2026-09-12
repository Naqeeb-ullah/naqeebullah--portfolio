import React, { useState } from "react";
import { VERIFIED_PORTFOLIO_DATA } from "../data/portfolioData.js";
import { X, Mail, Phone, Linkedin, MapPin, Copy, Check, ExternalLink, Download, UserPlus } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const { identity, availability } = VERIFIED_PORTFOLIO_DATA;

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Generate and download a standard vCard file (.vcf)
  const handleDownloadVCard = () => {
    const vCardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${identity.fullName}`,
      `N:Mohammadi;Naqeeb;Ullah;;`,
      `TITLE:${identity.primaryTitle}`,
      `EMAIL;TYPE=INTERNET,WORK:${identity.email}`,
      `TEL;TYPE=CELL:${identity.phone}`,
      `ADR;TYPE=WORK:;;${identity.location};;;;`,
      `URL:${identity.linkedin}`,
      `NOTE:Verified Full-Stack Web Developer & Agentic AI Learner. Available for freelance & internships.`,
      "END:VCARD"
    ].join("\r\n");

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Naqeeb_Ullah_Contact.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Verified Direct Contact
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Connect with {identity.professionalName}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {identity.location}
          </p>
        </div>

        {/* Availability Banner */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 mb-5">
          <span className="font-bold block mb-0.5">Verified Availability Status:</span>
          {availability}
        </div>

        <div className="space-y-3 text-sm">
          {/* Email */}
          <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Email</span>
                <span className="font-semibold text-slate-900 text-xs sm:text-sm truncate block">
                  {identity.email}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleCopy("email", identity.email)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              title="Copy email"
            >
              {copiedField === "email" ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Phone */}
          <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone / WhatsApp</span>
                <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                  {identity.phone}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleCopy("phone", identity.phone)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                title="Copy phone"
              >
                {copiedField === "phone" ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <a
                href={`tel:${identity.phone}`}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                title="Call"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">LinkedIn</span>
                <span className="font-semibold text-slate-900 text-xs sm:text-sm truncate block">
                  naqeeb-ullah-muhammadi
                </span>
              </div>
            </div>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              title="Open LinkedIn in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Action Buttons: vCard Download & Close */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button
            onClick={handleDownloadVCard}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-700" />
            <span>Save to Contacts (.vcf)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
