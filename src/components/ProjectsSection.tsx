import React, { useState } from 'react';
import {
  Github,
  ArrowUpRight,
  Eye,
  Edit3,
  Plus,
  X,
  CheckCircle2,
} from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onEditProject: (project: ProjectItem) => void;
  onAddNewProject: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onEditProject,
  onAddNewProject,
}) => {
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const folafol = projects.find((p) => p.id === 'folafol');

  return (
    <section id="projects" className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 sm:mb-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#888888] uppercase">
              03 / SELECTED WORK
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f5f5]">
              Featured Projects.
            </h2>
          </div>

          <button
            onClick={onAddNewProject}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-[#888888] hover:text-[#f5f5f5] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Projects</span>
          </button>
        </div>

        {/* Large Studio-Style Featured Showcase: FOLAFOL */}
        {folafol && (
          <div className="mb-24">
            <div className="group rounded-3xl bg-[#111111] border border-white/[0.08] overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/[0.18]">
              
              {/* Massive Video-Based Mockup Showcase */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#000000] flex items-center justify-center">
                <video
                  src={folafol.videoUrl || 'https://res.cloudinary.com/fcsclifx/video/upload/v1793473651/WhatsApp_Video_2026-10-31_at_12.06.45_PM.mp4'}
                  poster={folafol.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Subtle Floating Video Badge */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest uppercase text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    APP PREVIEW
                  </span>
                </div>
              </div>

              {/* Showcase Meta & Details */}
              <div className="p-8 sm:p-12 text-left space-y-6">
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888]">
                      {folafol.badge}
                    </span>
                    <h3 className="font-editorial text-3xl sm:text-5xl font-bold text-[#f5f5f5] mt-1">
                      {folafol.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveModalProject(folafol)}
                      className="btn-minimal-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Project</span>
                    </button>

                    <a
                      href="https://github.com/zerolap657-design"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-minimal-outline px-4 py-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>

                    <button
                      onClick={() => onEditProject(folafol)}
                      className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#888888] hover:text-[#f5f5f5] border border-white/[0.08] transition-colors cursor-pointer"
                      title="Edit project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-[#888888] max-w-3xl leading-relaxed font-normal">
                  {folafol.description}
                </p>

                {/* Technologies List */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-[#555555] mr-2">Technologies:</span>
                  {folafol.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/[0.04] text-xs font-mono text-[#cccccc] border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Additional Studio Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {projects
            .filter((p) => p.id !== 'folafol')
            .map((project) => (
              <div
                key={project.id}
                className="group rounded-3xl bg-[#111111] border border-white/[0.08] overflow-hidden flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#000000]">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter grayscale contrast-[1.05] brightness-[0.88] group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => onEditProject(project)}
                        className="p-2 rounded-xl bg-[#050505]/80 text-[#888888] hover:text-white border border-white/[0.08] backdrop-blur-md"
                        title="Edit project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                      {project.badge}
                    </span>
                    <h4 className="font-editorial text-2xl font-bold text-[#f5f5f5]">
                      {project.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-[#888888]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#888888] hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#888888] hover:text-white transition-colors cursor-pointer"
                      title="Details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
        </div>

        {/* Project Details Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl rounded-3xl bg-[#111111] border border-white/[0.12] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto text-left">
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] text-[#888888] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888]">
                  {activeModalProject.badge}
                </span>

                <h3 className="font-editorial text-3xl font-bold text-[#f5f5f5]">
                  {activeModalProject.title}
                </h3>

                <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-black">
                  {activeModalProject.videoUrl ? (
                    <video
                      src={activeModalProject.videoUrl}
                      controls
                      autoPlay
                      muted
                      playsInline
                      className="w-full max-h-[380px] object-contain mx-auto"
                    />
                  ) : (
                    <img
                      src={activeModalProject.image}
                      alt={activeModalProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                  )}
                </div>

                <p className="text-sm text-[#888888] leading-relaxed">
                  {activeModalProject.description}
                </p>

                <div className="space-y-2">
                  <h5 className="text-xs font-mono uppercase text-[#f5f5f5] tracking-wider">
                    Highlights
                  </h5>
                  <ul className="space-y-2 text-xs text-[#888888]">
                    {activeModalProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="px-4 py-2 rounded-full text-xs text-[#888888] hover:text-white"
                  >
                    Close
                  </button>
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-minimal-white px-5 py-2 rounded-full text-xs font-semibold"
                  >
                    Open GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
