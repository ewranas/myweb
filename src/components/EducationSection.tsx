import React, { useState } from 'react';
import { ExternalLink, Award, CheckCircle2, Maximize2, X, ShieldCheck } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const certImageSrc = '/assets/aistudio/WhatsApp_Image_2026-10-31_at_12.01.30_PM_dedfa43c.jpeg';
  const verificationUrl = 'https://coursera.org/verify/professional-cert/WWZ1YY2D4MY8G';

  return (
    <section id="education" className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 bg-[#050505] border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto text-left">
        
        {/* Section Heading */}
        <div className="reveal-item mb-14 space-y-2">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#888888] uppercase">
            05 / ACADEMICS & CREDENTIALS
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f5f5]">
            Education & Certifications.
          </h2>
        </div>

        <div className="space-y-8">
          {/* Current College Card */}
          <div className="reveal-item p-8 sm:p-12 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#888888] tracking-widest uppercase">
                Current College
              </span>
              <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-[#f5f5f5]">
                Shahid AHM Kamaruzzaman College
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-white/[0.06] text-left">
              {[
                { label: 'Grade', val: 'Class 11' },
                { label: 'Batch', val: 'HSC 2028' },
                { label: 'Stream', val: 'Science Group' },
                { label: 'Location', val: 'Natore, Bangladesh' },
              ].map((item, i) => (
                <div key={i} className="group/stat">
                  <span className="text-[10px] font-mono text-[#666666] uppercase block group-hover/stat:text-rose-400 transition-colors">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-[#f5f5f5] mt-1 block">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Certificate Section Under College */}
          <div className="reveal-item p-8 sm:p-12 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(255,255,255,0.03)] space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#f5f5f5]" />
                  <span className="text-xs font-mono text-[#888888] tracking-widest uppercase">
                    Professional Certification
                  </span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#f5f5f5]">
                  Google Cybersecurity Professional Certificate
                </h3>
                <p className="text-sm text-[#888888] pt-0.5">
                  Issued by <span className="text-[#f5f5f5] font-medium">Google</span> via Coursera · Oct 29, 2025
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-white/[0.06] hover:bg-white/[0.12] text-[#f5f5f5] border border-white/[0.1] transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3 h-3 text-[#888888]" />
                </a>
              </div>
            </div>

            {/* Certificate Image Frame */}
            <div className="space-y-4">
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.1] bg-black/40 shadow-2xl transition-all duration-300 hover:border-white/[0.25]"
              >
                <img
                  src={certImageSrc}
                  alt="Google Cybersecurity Professional Certificate - Anas Ahamed"
                  className="w-full h-auto object-cover max-h-[520px] transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-mono tracking-wider border border-white/20 shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to view full certificate</span>
                  </div>
                </div>
              </div>

              {/* Certificate meta summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-[#888888] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-[#666666] uppercase block">Specialization</span>
                    <span className="text-xs font-medium text-[#f5f5f5] mt-0.5 block">9 In-Depth Courses</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#666666] uppercase block">Core Competencies</span>
                  <span className="text-xs font-medium text-[#f5f5f5] mt-0.5 block">Python, Linux, SQL, SIEM & IDS</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#666666] uppercase block">Credential ID</span>
                  <span className="text-xs font-mono text-[#888888] mt-0.5 block truncate">WWZ1YY2D4MY8G</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <span className="text-xs font-mono text-[#888888]">Google Cybersecurity Professional Certificate</span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto rounded-xl border border-white/20 shadow-2xl bg-white max-h-[82vh]">
              <img
                src={certImageSrc}
                alt="Google Cybersecurity Professional Certificate - Anas Ahamed"
                className="w-full h-auto max-w-full block"
              />
            </div>
            <div className="w-full flex justify-end pt-3">
              <a
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-white/80 hover:text-white transition-colors"
              >
                <span>Verify on Coursera</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

