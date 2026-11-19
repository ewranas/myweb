import React, { useState } from 'react';
import { ExternalLink, Maximize2, X } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [certTilt, setCertTilt] = useState({ rx: 0, ry: 0 });
  const [isCertHovered, setIsCertHovered] = useState(false);
  const certImageSrc = '/assets/aistudio/WhatsApp_Image_2026-10-31_at_12.01.30_PM_dedfa43c.jpeg';
  const verificationUrl = 'https://coursera.org/verify/professional-cert/WWZ1YY2D4MY8G';

  const handleCertMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setCertTilt({
      rx: -ny * 7,
      ry: nx * 9,
    });
  };

  const handleCertMouseLeave = () => {
    setIsCertHovered(false);
    setCertTilt({ rx: 0, ry: 0 });
  };

  return (
    <section id="education" className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 bg-[var(--bg-pure)] transition-colors duration-500 border-t border-white/[0.06]">
      <style>{`
        @keyframes certGentleSway {
          0%, 100% {
            transform: perspective(1300px) translateY(0px) rotateX(2.5deg) rotateY(-3.5deg) rotateZ(-0.45deg);
          }
          50% {
            transform: perspective(1300px) translateY(-8px) rotateX(-2deg) rotateY(3.5deg) rotateZ(0.45deg);
          }
        }
        .cert-sway-loop {
          animation: certGentleSway 6.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .cert-sway-loop {
            animation: none !important;
          }
        }
      `}</style>

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

        <div className="space-y-12">
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

          {/* Minimal Floating 3D Certificate Showcase (Just Certificate + Gentle Motion) */}
          <div className="reveal-item pt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Minimal Left Title & Verify Link */}
            <div className="lg:col-span-4 space-y-1.5 pt-1 text-left">
              <h3 className="text-base sm:text-lg font-semibold text-[#f5f5f5]">
                Google Cybersecurity
              </h3>
              <p className="text-xs sm:text-sm text-[#787880]">
                Professional Certificate, 2025
              </p>
              <div className="pt-1.5">
                <a
                  href={verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#888888] hover:text-white transition-colors"
                >
                  <span>Verify ↗</span>
                </a>
              </div>
            </div>

            {/* Right Gently Swaying / Interactive 3D Certificate */}
            <div
              className="lg:col-span-8 relative"
              onMouseEnter={() => setIsCertHovered(true)}
              onMouseMove={handleCertMouseMove}
              onMouseLeave={handleCertMouseLeave}
            >
              {/* Soft Ambient Theme Backlight */}
              <div
                className="pointer-events-none absolute -inset-4 rounded-3xl blur-3xl transition-opacity duration-700"
                style={{
                  opacity: isCertHovered ? 0.34 : 0.14,
                  background:
                    'radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 72%)',
                }}
                aria-hidden="true"
              />

              {/* Continuous Gentle Sway Wrapper */}
              <div className="cert-sway-loop">
                {/* Interactive Hover Tilt & Scale */}
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsLightboxOpen(true);
                    }
                  }}
                  aria-label="View Google Cybersecurity Professional Certificate"
                  className="group relative cursor-pointer overflow-hidden rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                  style={{
                    transform: isCertHovered
                      ? `perspective(1300px) rotateX(${certTilt.rx}deg) rotateY(${certTilt.ry}deg) scale(1.02)`
                      : 'perspective(1300px) scale(0.99)',
                    boxShadow: isCertHovered
                      ? '0 28px 60px rgba(0, 0, 0, 0.85), 0 0 32px var(--accent-glow)'
                      : '0 20px 44px rgba(0, 0, 0, 0.72)',
                  }}
                >
                  <img
                    src={certImageSrc}
                    alt="Google Cybersecurity Professional Certificate - Anas Ahamed"
                    className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-[1.015]"
                    loading="lazy"
                  />

                  {/* Subtle Diagonal Sheen */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                    style={{
                      opacity: isCertHovered ? 0.12 : 0.28,
                      background:
                        'linear-gradient(125deg, rgba(0,0,0,0.28) 0%, transparent 48%, rgba(255,255,255,0.12) 52%, rgba(0,0,0,0.26) 100%)',
                    }}
                  />

                  {/* Discreet Hover Expand Icon */}
                  <div className="pointer-events-none absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
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

