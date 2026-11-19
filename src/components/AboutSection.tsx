import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { BangladeshHometownMap } from './BangladeshHometownMap';

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
    setTimeout(() => setIsBouncing(false), 380);

    const heartId = Date.now() + Math.random();
    const randomX = (Math.random() - 0.5) * 24;
    setFloatingHearts((prev) => [...prev, { id: heartId, x: randomX }]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== heartId));
    }, 900);
  };

  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 bg-[var(--bg-pure)] transition-colors duration-500 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="reveal-item mb-16 sm:mb-20 space-y-2 text-left">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#888888] uppercase">
            02 / ABOUT ME
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f5f5]">
            A Curious Builder From Bangladesh.
          </h2>
        </div>

        {/* 2-Column Layout: Photo + Bio (Left) | Clean Bangladesh Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Portrait + Interactive Heart Counter + Bio */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="reveal-item flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Portrait */}
              <div className="relative w-52 sm:w-60 aspect-[4/5] rounded-3xl overflow-hidden bg-[#111111] border border-white/[0.1] shadow-2xl shrink-0 group">
                <img
                  src={personalInfo.photoUrl || '/assets/images/anas_profile_real.jpg'}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      '/assets/images/anas_profile_portrait_1793470981773.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Small Love Appreciation Counter Beside Photo (2,000+ increment on click) */}
              <div className="relative flex flex-col items-start gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-mono font-semibold transition-all duration-200 cursor-pointer select-none shadow-lg ${
                      hasLiked
                        ? 'bg-rose-500/20 border-rose-500/60 text-white'
                        : 'bg-[#111111] hover:bg-white/[0.06] border-white/[0.12] hover:border-rose-500/40 text-[#f5f5f5]'
                    } ${isBouncing ? 'scale-110' : 'hover:scale-105 active:scale-95'}`}
                    title="Send love"
                    aria-label={`Love counter ${likes}`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        hasLiked ? 'fill-rose-500 text-rose-500' : 'text-rose-400'
                      }`}
                    />
                    <span className="tabular-nums">{likes.toLocaleString()}</span>
                  </button>

                  {floatingHearts.map((heart) => (
                    <div
                      key={heart.id}
                      className="pointer-events-none absolute -top-2 left-1/2 flex items-center gap-0.5 text-xs text-rose-400 font-bold animate-float-heart"
                      style={{ marginLeft: `${heart.x}px` }}
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span className="text-[10px] font-mono">+1</span>
                    </div>
                  ))}
                </div>
                <span className="text-[11px] font-mono text-[#777777]">
                  Tap to appreciate
                </span>
              </div>
            </div>

            {/* Bio Details */}
            <div className="reveal-item space-y-4 text-sm sm:text-base text-[#aaaaaa] leading-relaxed">
              {personalInfo.bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Clean Quick Stats */}
            <div className="reveal-item grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono text-[#666666] uppercase block">Age</span>
                <span className="text-sm font-semibold text-[#f5f5f5] mt-0.5 block">
                  {personalInfo.age} Years ({personalInfo.birthDate})
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#666666] uppercase block">College</span>
                <span className="text-sm font-semibold text-[#f5f5f5] mt-0.5 block">
                  Shahid AHM Kamaruzzaman
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#666666] uppercase block">Focus</span>
                <span className="text-sm font-semibold text-[#f5f5f5] mt-0.5 block">
                  Dev &amp; Cyber Security
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Bangladesh Map */}
          <div className="lg:col-span-6 reveal-item">
            <BangladeshHometownMap />
          </div>
        </div>
      </div>
    </section>
  );
};
