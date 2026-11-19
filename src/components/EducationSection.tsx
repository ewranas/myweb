import React, { useState } from 'react';
import { ExternalLink, Maximize2, X } from 'lucide-react';

interface CertificateItem {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  alt: string;
  verificationUrl?: string;
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: 'google-cybersecurity',
    title: 'Google Cybersecurity',
    subtitle: 'Professional Certificate, 2025',
    imageSrc: '/assets/aistudio/WhatsApp_Image_2026-10-31_at_12.01.30_PM_dedfa43c.jpeg',
    alt: 'Google Cybersecurity Professional Certificate - Anas Ahamed',
    verificationUrl: 'https://coursera.org/verify/professional-cert/WWZ1YY2D4MY8G',
  },
  {
    id: 'linkedin-generative-ai-ethics',
    title: 'Ethics in the Age of Generative AI',
    subtitle: 'LinkedIn Learning · Aug 2025',
    imageSrc: '/assets/images/certificate_second.jpg',
    alt: 'LinkedIn Learning Ethics in the Age of Generative AI Certificate - Anas Ahamed',
  },
  {
    id: 'microsoft-powerpoint',
    title: 'Work Smarter with Microsoft PowerPoint',
    subtitle: 'Microsoft · Coursera (With Honors), Sep 2025',
    imageSrc: '/assets/images/certificate_third.jpg',
    alt: 'Microsoft Coursera Work Smarter with Microsoft PowerPoint Certificate - Anas Ahamed',
    verificationUrl: 'https://coursera.org/verify/G17WA3BTZ2Xj',
  },
];

interface CertificateRowProps {
  cert: CertificateItem;
  index: number;
  onOpenLightbox: (cert: CertificateItem) => void;
}

const CertificateRow: React.FC<CertificateRowProps> = ({ cert, index, onOpenLightbox }) => {
  const [certTilt, setCertTilt] = useState({ rx: 0, ry: 0 });
  const [isCertHovered, setIsCertHovered] = useState(false);

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
    <div className="reveal-item pt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* Minimal Left Title & Optional Verify Link */}
      <div className="lg:col-span-4 space-y-1.5 pt-1 text-left">
        <h3 className="text-base sm:text-lg font-semibold text-[#f5f5f5]">
          {cert.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#787880]">
          {cert.subtitle}
        </p>
        {cert.verificationUrl && (
          <div className="pt-1.5">
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[#888888] hover:text-white transition-colors"
            >
              <span>Verify ↗</span>
            </a>
          </div>
        )}
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
        <div
          className="cert-sway-loop"
          style={{ animationDelay: `${index * -2.2}s` }}
        >
          {/* Interactive Hover Tilt & Scale */}
          <div
            onClick={() => onOpenLightbox(cert)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(cert);
              }
            }}
            aria-label={`View ${cert.title}`}
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
              src={cert.imageSrc}
              alt={cert.alt}
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-[1.015]"
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
  );
};

export const EducationSection: React.FC = () => {
  const [activeLightboxCert, setActiveLightboxCert] = useState<CertificateItem | null>(null);

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

          {/* Floating 3D Certificates Showcase */}
          <div className="space-y-16 sm:space-y-20">
            {CERTIFICATES.map((cert, index) => (
              <CertificateRow
                key={cert.id}
                cert={cert}
                index={index}
                onOpenLightbox={setActiveLightboxCert}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightboxCert(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <span className="text-xs font-mono text-[#888888]">{activeLightboxCert.title}</span>
              <button
                type="button"
                onClick={() => setActiveLightboxCert(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto rounded-xl border border-white/20 shadow-2xl bg-white max-h-[82vh]">
              <img
                src={activeLightboxCert.imageSrc}
                alt={activeLightboxCert.alt}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-w-full block"
              />
            </div>
            {activeLightboxCert.verificationUrl && (
              <div className="w-full flex justify-end pt-3">
                <a
                  href={activeLightboxCert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-white/80 hover:text-white transition-colors"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
