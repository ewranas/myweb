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
        <div className="reveal-item text-left mb-16 sm:mb-20 space-y-2">
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
          <div className="reveal-item lg:col-span-5 flex flex-col items-start">
            <div className="relative group w-full max-w-sm">
              
              {/* Clean frame showcasing authentic color photo with hover glow */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#111111] border border-white/[0.14] group-hover:border-rose-500/40 shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(225,29,72,0.18)]">
                <img
                  src={personalInfo.photoUrl || '/src/assets/images/anas_profile_real.jpg'}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out shadow-inner"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://res.cloudinary.com/fcsclifx/image/upload/v1793472771/WhatsApp_Image_2026-10-31_at_11.49.37_AM.jpg';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />

                {/* Change photo button */}
                <button
                  onClick={onOpenCustomizer}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-[#111111]/80 hover:bg-[#222222] text-[#888888] hover:text-[#f5f5f5] border border-white/[0.08] backdrop-blur-md transition-all hover:scale-105 cursor-pointer shadow-lg"
                  title="Upload or change photo"
                  aria-label="Upload photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Minimal caption */}
              <div className="mt-4 text-left">
                <p className="text-sm font-semibold text-[#f5f5f5] flex items-center gap-2">
                  <span>Anas Ahammed</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </p>
                <p className="text-xs text-[#888888] mt-0.5">
                  Natore, Bangladesh · Age 17
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative Content & Minimal Facts (7 cols) */}
          <div className="reveal-item lg:col-span-7 space-y-8 text-left">
            
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

              <p className="text-[#f5f5f5] border-l-2 border-rose-500/50 pl-4 py-1 italic font-light bg-gradient-to-r from-rose-500/[0.05] to-transparent rounded-r-lg">
                My goal is to become a skilled software developer and build products that make a meaningful difference.
              </p>
            </div>

            {/* Minimal Personal Info Strip with Animated Hover Tiles */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              {[
                { label: 'Born', value: '23 June 2009' },
                { label: 'College', value: 'Shahid AHM Kamaruzzaman' },
                { label: 'Batch', value: 'Class 11 (HSC 2028)' },
                { label: 'Location', value: 'Natore, Bangladesh' },
                { label: 'Discipline', value: 'Science Group' },
                { label: 'Aspiration', value: 'Software Developer' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.18] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block group-hover:text-rose-400/80 transition-colors">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-[#f5f5f5] mt-1 block truncate">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
