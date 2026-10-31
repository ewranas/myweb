import React from 'react';
import { Camera } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';

interface AboutSectionProps {
  personalInfo: PersonalInfo;
  onOpenCustomizer: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  personalInfo,
  onOpenCustomizer,
}) => {
  return (
    <section id="about" className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-left mb-16 sm:mb-20 space-y-2">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#888888] uppercase">
            02 / BIOGRAPHY
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f5f5]">
            A Little About Me.
          </h2>
        </div>

        {/* Editorial 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait Presentation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="relative group w-full max-w-sm">
              
              {/* Clean frame showcasing authentic color photo */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#111111] border border-white/[0.14] shadow-2xl">
                <img
                  src={personalInfo.photoUrl || '/src/assets/images/anas_profile_real.jpg'}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 shadow-inner"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://res.cloudinary.com/fcsclifx/image/upload/v1793472771/WhatsApp_Image_2026-10-31_at_11.49.37_AM.jpg';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent opacity-40 pointer-events-none" />

                {/* Change photo button */}
                <button
                  onClick={onOpenCustomizer}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-[#111111]/80 hover:bg-[#222222] text-[#888888] hover:text-[#f5f5f5] border border-white/[0.08] backdrop-blur-md transition-colors cursor-pointer"
                  title="Upload or change photo"
                  aria-label="Upload photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Minimal caption */}
              <div className="mt-4 text-left">
                <p className="text-sm font-semibold text-[#f5f5f5]">
                  Anas Ahammed
                </p>
                <p className="text-xs text-[#888888] mt-0.5">
                  Natore, Bangladesh · Age 17
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative Content & Minimal Facts (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="space-y-6 text-base sm:text-lg text-[#888888] font-normal leading-relaxed">
              <p className="text-xl sm:text-2xl font-light text-[#f5f5f5] leading-snug">
                Hi, I&apos;m Anas Ahammed.
              </p>

              <p className="text-[#cccccc]">
                I&apos;m a 17-year-old student currently studying in Class 11 at <strong className="text-white font-medium">Shahid AHM Kamaruzzaman College</strong> in Bangladesh.
              </p>

              <p>
                My curiosity about computers and the internet gradually developed into a passion for programming and software development.
              </p>

              <p>
                I enjoy exploring new technologies, learning programming, and creating useful digital experiences.
              </p>

              <p className="text-[#f5f5f5] border-l border-white/[0.2] pl-4 py-1 italic font-light">
                My goal is to become a skilled software developer and build products that make a meaningful difference.
              </p>
            </div>

            {/* Minimal Personal Info Strip */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-6 text-left">
              <div>
                <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block">
                  Born
                </span>
                <span className="text-sm font-medium text-[#f5f5f5] mt-1 block">
                  23 June 2009
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block">
                  College
                </span>
                <span className="text-sm font-medium text-[#f5f5f5] mt-1 block truncate">
                  Shahid AHM Kamaruzzaman
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block">
                  Batch
                </span>
                <span className="text-sm font-medium text-[#f5f5f5] mt-1 block">
                  Class 11 (HSC 2028)
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block">
                  Location
                </span>
                <span className="text-sm font-medium text-[#f5f5f5] mt-1 block">
                  Natore, Bangladesh
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block">
                  Discipline
                </span>
                <span className="text-sm font-medium text-[#f5f5f5] mt-1 block">
                  Science Group
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block">
                  Aspiration
                </span>
                <span className="text-sm font-medium text-[#f5f5f5] mt-1 block">
                  Software Developer
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
