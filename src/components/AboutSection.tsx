import React, { useState } from 'react';
import { PersonalInfo } from '../types/portfolio';
import { BangladeshHometownMap } from './BangladeshHometownMap';
import { Heart } from 'lucide-react';

interface AboutSectionProps {
  personalInfo: PersonalInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ personalInfo }) => {
  const [likes, setLikes] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('anas_photo_likes');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 2000) return parsed;
      }
    } catch {
      // ignore
    }
    return 2000;
  });

  const [hasLiked, setHasLiked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('anas_photo_user_liked') === 'true';
    } catch {
      return false;
    }
  });

  const [isBouncing, setIsBouncing] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('anas_photo_likes', next.toString());
        localStorage.setItem('anas_photo_user_liked', 'true');
      } catch {
        // ignore
      }
      return next;
    });
    setHasLiked(true);
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 450);

    const heartId = Date.now() + Math.random();
    const randomX = (Math.random() - 0.5) * 26;
    setFloatingHearts((prev) => [...prev, { id: heartId, x: randomX }]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== heartId));
    }, 1000);
  };

  return (
    <section id="about" className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 bg-[var(--bg-pure)] transition-colors duration-500">
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
              <div
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#111111] border border-white/[0.14] shadow-2xl transition-all duration-500"
                style={{
                  boxShadow: '0 0 40px var(--shadow-accent-glow)',
                }}
              >
                <img
                  src={personalInfo.photoUrl?.replace('/src/', '/') || '/assets/images/anas_profile_real.jpg'}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out shadow-inner"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://res.cloudinary.com/fcsclifx/image/upload/v1793472771/WhatsApp_Image_2026-10-31_at_11.49.37_AM.jpg';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-pure)]/70 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />

                {/* Interactive Heart / Love Button on Photo */}
                <div className="absolute top-3.5 right-3.5 z-20">
                  <button
                    type="button"
                    onClick={handleLike}
                    className={`group/like flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-mono font-medium transition-all duration-300 cursor-pointer shadow-lg select-none ${
                      hasLiked
                        ? 'bg-rose-950/80 border-rose-500/60 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]'
                        : 'bg-black/65 hover:bg-black/85 border-white/15 hover:border-white/30 text-white/90 hover:text-white'
                    } ${isBouncing ? 'scale-110' : 'hover:scale-105 active:scale-95'}`}
                    title="Click to send love to Anas!"
                    aria-label="Like Anas photo"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-all duration-300 ${
                        hasLiked
                          ? 'fill-rose-500 text-rose-400 drop-shadow-[0_0_8px_#ff4d6d]'
                          : 'text-white/80 group-hover/like:text-rose-400 group-hover/like:scale-110'
                      }`}
                    />
                    <span className="font-semibold tracking-tight text-[11px]">
                      {likes.toLocaleString()}
                    </span>
                  </button>

                  {/* Floating +1 Heart Effect */}
                  {floatingHearts.map((heart) => (
                    <div
                      key={heart.id}
                      className="pointer-events-none absolute -top-1 left-1/2 flex items-center gap-0.5 text-xs text-rose-400 font-bold animate-float-heart"
                      style={{
                        marginLeft: `${heart.x}px`,
                      }}
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-400" />
                      <span className="text-[10px] text-rose-300 font-mono">+1</span>
                    </div>
                  ))}
                </div>
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

            {/* Hometown Bangladesh Map Card highlighting Natore */}
            <BangladeshHometownMap />

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
