import React, { useState, useMemo } from "react";
import { VERIFIED_PORTFOLIO_DATA } from "../data/portfolioData.js";
import { 
  Code2, 
  Layers, 
  Cpu, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Sparkles, 
  FolderGit2, 
  Compass, 
  Database, 
  KeyRound, 
  Wrench, 
  Bot, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  CheckCircle2, 
  ArrowUpRight,
  Search,
  FileText,
  Workflow,
  ShieldCheck,
  Zap,
  Info
} from "lucide-react";
import { ProjectItem } from "./ProjectModal.js";

interface PortfolioViewProps {
  onAskAI: (query: string) => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  onAskAI,
  onSelectProject,
  onOpenResume,
  onOpenContact,
}) => {
  const { 
    identity, 
    summary, 
    about, 
    education, 
    skills, 
    training, 
    experience, 
    certifications, 
    projects, 
    aiLab, 
    availability 
  } = VERIFIED_PORTFOLIO_DATA;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechFilter, setSelectedTechFilter] = useState("All");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("All");

  const filterTags = ["All", "React", "Node.js", "Supabase", "Gemini API", "Tailwind CSS"];

  // Search and Filter Projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTech = 
        selectedTechFilter === "All" ||
        p.tech.some((t) => t.toLowerCase().includes(selectedTechFilter.toLowerCase()));

      return matchesSearch && matchesTech;
    });
  }, [projects, searchQuery, selectedTechFilter]);

  return (
    <div className="space-y-12 pb-16 bg-white text-slate-900">
      
      {/* Bilingual Welcome & Hero Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          <div className="max-w-3xl">
            {/* Urdu & English Header Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>خوش آمدید • Welcome to Naqeeb Ullah&apos;s Portfolio</span>
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>Quetta, Balochistan, Pakistan</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Crafting reliable web applications & exploring Agentic AI systems.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {summary}
            </p>

            <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 block mb-1">Authentic Journey:</span>
              {about}
            </div>

            {/* Quick Action CTA Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onAskAI("What projects has Naqeeb built?")}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-xs"
              >
                <Bot className="w-4 h-4" />
                <span>Ask Naqeeb AI about Projects</span>
              </button>

              <button
                onClick={onOpenResume}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 border border-slate-200 shadow-xs"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>View Full CV / Resume</span>
              </button>

              <button
                onClick={onOpenContact}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 border border-slate-200 shadow-xs"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>Contact Direct</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics & Availability Highlight Card */}
          <div className="w-full lg:w-80 flex-shrink-0 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Facts Only</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Current Training:</span>
                <span className="font-semibold text-slate-900 block mt-0.5">SMIT — Agentic AI</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Internship Completed:</span>
                <span className="font-semibold text-slate-900 block mt-0.5">Internee.pk (Web Dev)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Verified Projects:</span>
                <span className="font-semibold text-slate-900 block mt-0.5">5 Completed Applications</span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <span className="text-emerald-700 block text-[11px] font-bold">Status:</span>
                <span className="font-semibold block mt-0.5 leading-tight">Open for freelance & internships</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Global Interactive Search & Filter Bar */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, technologies, skills, or training..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* Tech Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">Filter:</span>
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTechFilter(tag)}
              className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                selectedTechFilter === tag
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Verified Projects Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Verified Projects Showcase
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Practical web applications and AI chatbot experiments built by Naqeeb Ullah. Click any card for details.
            </p>
          </div>

          <span className="text-xs text-slate-500 font-medium self-start sm:self-auto">
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectProject(p)}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all cursor-pointer relative"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-emerald-300 group-hover:bg-emerald-50/50 transition-colors">
                    {p.id.includes("balochistan") || p.id.includes("quetta") ? (
                      <Compass className="w-5 h-5 text-teal-600" />
                    ) : p.id.includes("ai") ? (
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                    ) : p.id.includes("vault") ? (
                      <Database className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <Code2 className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Verified
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {p.title}
                </h4>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {p.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                  <span>View Project Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive AI Lab Architecture Visualizer */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                AI Lab & Exploration Focus
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Active learning in modern AI architectures, agentic workflows, and Google Gemini integration.
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            SMIT Agentic AI Track
          </span>
        </div>

        {/* Visual Architecture Pipeline */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 my-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-4">
            Naqeeb AI Grounded Architecture Diagram
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-1.5">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold block text-slate-900">React Client</span>
              <span className="text-[10px] text-slate-500">Tailwind + Interactive UI</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-1.5">
                <Workflow className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold block text-slate-900">Express API</span>
              <span className="text-[10px] text-slate-500">Secure /api/chat Proxy</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-1.5">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold block text-slate-900">Gemini 3.8 Flash</span>
              <span className="text-[10px] text-slate-500">@google/genai SDK</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-1.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold block text-slate-900">Grounded Rules</span>
              <span className="text-[10px] text-slate-500">Zero Hallucination Guard</span>
            </div>
          </div>
        </div>

        {/* AI Lab Focus Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {aiLab.focusAreas.map((h, i) => (
            <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">{h}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Verified focus area</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills Matrix */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Verified Technical Skills
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Technologies and tools actively used and verified in projects and training.
            </p>
          </div>

          {/* Skill Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {["All", ...Object.keys(skills)].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedSkillCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedSkillCategory === cat
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills)
            .filter(([category]) => selectedSkillCategory === "All" || selectedSkillCategory === category)
            .map(([category, items]) => (
              <div key={category} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {category}
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                    {items.length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Experience, Training & Education */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Training & Experience */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Experience & Training
            </h3>
          </div>

          <div className="space-y-4">
            {training.map((t, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    {t.provider}
                  </h4>
                  {t.note && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap">
                      {t.note}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {t.programs.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Education & Certifications
            </h3>
          </div>

          {/* Education */}
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">
                  Degree / Program
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  {edu.degree}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {edu.institution}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                  <span>Duration: {edu.duration}</span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-700">{edu.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications List */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Verified Certifications</span>
            </h4>

            <div className="space-y-2">
              {certifications.map((c, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-900 block">{c.title}</span>
                    <span className="text-slate-500 text-[11px]">{c.provider}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
