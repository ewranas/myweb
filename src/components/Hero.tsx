import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { HeroSlide } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  slides: HeroSlide[];
  personalInfo: PersonalInfo;
  onOpenContactModal: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  slides,
  personalInfo,
  onOpenContactModal,
  onExploreProjects,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();
  const [moonOverride, setMoonOverride] = useState<'red' | 'blue' | null>(null);
  const [moonPulseKey, setMoonPulseKey] = useState(0);

  // Sync/reset moon override whenever global Navbar theme changes
  useEffect(() => {
    setMoonOverride(null);
  }, [theme]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const isBlueMoon = moonOverride ? moonOverride === 'blue' : theme === 'midnight-blue';

  const handleMoonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const nextIsBlue = !isBlueMoon;
    setMoonOverride(nextIsBlue ? 'blue' : 'red');
    setMoonPulseKey((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent('trigger-lightning', {
        detail: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          colorOverride: nextIsBlue ? 'blue' : 'red',
        },
      })
    );
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col justify-end pb-14 sm:pb-20 pt-28 px-6 sm:px-12 lg:px-16 overflow-hidden bg-[var(--bg-pure)] transition-colors duration-500"
    >
      {/* Background Slides Carousel */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-center transition-all duration-1000 ${
              isBlueMoon
                ? 'hue-rotate-[215deg] brightness-[0.55] contrast-[1.15]'
                : 'brightness-[0.55] contrast-[1.15]'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-pure)] via-black/45 to-black/55" />
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{
              background: isBlueMoon
                ? 'radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.28), transparent 60%)'
                : 'radial-gradient(circle at 75% 25%, rgba(225, 29, 72, 0.26), transparent 60%)',
            }}
          />
        </div>
      ))}

      {/* Interactive Glowing / Burning Moon ("Jolonto Moon") — Click to Shift Color */}
      <div
        className="pointer-events-none select-none absolute top-20 right-5 sm:top-24 sm:right-10 lg:top-20 lg:right-16 z-[12] w-36 h-36 sm:w-56 sm:h-56 lg:w-72 lg:h-72 flex items-center justify-center"
      >
        {/* Outer Fiery Corona Aura */}
        <div
          className="absolute -inset-12 sm:-inset-16 rounded-full blur-3xl opacity-80 animate-[pulse_4.5s_ease-in-out_infinite] transition-all duration-700"
          style={{
            background: isBlueMoon
              ? 'radial-gradient(circle, rgba(125, 211, 252, 0.55) 0%, rgba(59, 130, 246, 0.4) 45%, rgba(30, 58, 138, 0.14) 72%, transparent 100%)'
              : 'radial-gradient(circle, rgba(255, 115, 55, 0.55) 0%, rgba(225, 29, 72, 0.4) 45%, rgba(136, 19, 55, 0.14) 72%, transparent 100%)',
          }}
        />

        {/* Rotating Heat-Shimmer Flare Ring */}
        <div
          className="absolute -inset-3 sm:-inset-5 rounded-full blur-xl opacity-70 animate-[spin_36s_linear_infinite] transition-all duration-700"
          style={{
            background: isBlueMoon
              ? 'conic-gradient(from 0deg, rgba(56, 189, 248, 0.6), rgba(59, 130, 246, 0.22), rgba(224, 242, 254, 0.55), rgba(37, 99, 235, 0.18), rgba(56, 189, 248, 0.6))'
              : 'conic-gradient(from 0deg, rgba(251, 146, 60, 0.6), rgba(225, 29, 72, 0.22), rgba(255, 237, 213, 0.55), rgba(225, 29, 72, 0.18), rgba(251, 146, 60, 0.6))',
          }}
        />

        {/* Oblique Plasma Orbit Arc */}
        <div
          className="absolute -inset-5 sm:-inset-7 rounded-full border opacity-30 transition-colors duration-700 animate-[spin_28s_linear_infinite_reverse]"
          style={{
            borderLeftColor: isBlueMoon ? 'rgba(125, 211, 252, 0.5)' : 'rgba(253, 186, 116, 0.45)',
            borderRightColor: isBlueMoon ? 'rgba(125, 211, 252, 0.5)' : 'rgba(253, 186, 116, 0.45)',
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            transform: 'rotate(-24deg) scaleY(0.76)',
          }}
        />

        {/* Shockwave Ring Burst on Moon Click */}
        {moonPulseKey > 0 && (
          <span
            key={moonPulseKey}
            className="absolute inset-0 rounded-full animate-[ping_0.75s_cubic-bezier(0,0,0.2,1)_1] opacity-0"
            style={{
              border: `2px solid ${isBlueMoon ? '#7dd3fc' : '#fb923c'}`,
              boxShadow: isBlueMoon
                ? '0 0 30px rgba(56, 189, 248, 0.7)'
                : '0 0 30px rgba(251, 146, 60, 0.7)',
            }}
          />
        )}

        {/* Clickable Lunar Sphere Button */}
        <button
          type="button"
          onClick={handleMoonClick}
          title={isBlueMoon ? 'Click moon to ignite Crimson Fire' : 'Click moon to shift Electric Blue'}
          aria-label="Toggle moon color"
          className="pointer-events-auto cursor-pointer group/moon relative w-full h-full rounded-full overflow-hidden transition-all duration-700 hover:scale-[1.035] active:scale-[0.97] focus:outline-none"
          style={{
            background: isBlueMoon
              ? 'radial-gradient(circle at 36% 32%, #f0f9ff 0%, #bae6fd 26%, #38bdf8 60%, #1d4ed8 88%, #0f172a 100%)'
              : 'radial-gradient(circle at 36% 32%, #fff7ed 0%, #fdba74 26%, #ef4444 62%, #9f1239 88%, #4c0519 100%)',
            boxShadow: isBlueMoon
              ? '0 0 40px rgba(125, 211, 252, 0.7), 0 0 90px rgba(59, 130, 246, 0.6), inset -16px -18px 38px rgba(15, 23, 42, 0.68)'
              : '0 0 40px rgba(251, 146, 60, 0.7), 0 0 90px rgba(225, 29, 72, 0.6), inset -16px -18px 38px rgba(69, 10, 10, 0.68)',
          }}
        >
          {/* SVG Lunar Maria & Glowing Crater Relief */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full opacity-45 mix-blend-multiply transition-transform duration-700 group-hover/moon:scale-105"
            fill="none"
          >
            <circle cx="64" cy="58" r="18" fill="rgba(0,0,0,0.34)" />
            <circle cx="118" cy="48" r="11" fill="rgba(0,0,0,0.28)" />
            <circle cx="136" cy="94" r="24" fill="rgba(0,0,0,0.32)" />
            <circle cx="82" cy="116" r="28" fill="rgba(0,0,0,0.28)" />
            <circle cx="48" cy="108" r="9" fill="rgba(0,0,0,0.26)" />
            <circle cx="122" cy="148" r="15" fill="rgba(0,0,0,0.3)" />
            <circle cx="72" cy="158" r="8" fill="rgba(0,0,0,0.24)" />
            <ellipse cx="102" cy="78" rx="16" ry="11" fill="rgba(0,0,0,0.22)" />
          </svg>

          {/* Molten Rim Highlight */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-700"
            style={{
              boxShadow: isBlueMoon
                ? 'inset 4px 4px 20px rgba(240, 249, 255, 0.85), inset -4px -4px 18px rgba(125, 211, 252, 0.7)'
                : 'inset 4px 4px 20px rgba(255, 247, 237, 0.85), inset -4px -4px 18px rgba(251, 113, 133, 0.7)',
            }}
          />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full mx-auto space-y-8 text-left">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-[#aaaaaa]">
            <span style={{ color: 'var(--accent-secondary)' }}>{currentSlide?.label}</span>
            <span>·</span>
            <span>{personalInfo.location}</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-[#f5f5f7] leading-[1.02]">
            {currentSlide?.headline}
          </h1>

          <p className="text-base sm:text-xl text-[#cccccc] max-w-2xl leading-relaxed font-normal">
            {currentSlide?.subheadline}
          </p>
        </div>

        {/* Actions + Slide Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/[0.1]">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onExploreProjects}
              className="btn-minimal-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenContactModal}
              className="btn-minimal-outline px-6 py-3 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex ? 'w-7 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 ml-2">
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/[0.12] flex items-center justify-center text-white cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
                className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/[0.12] flex items-center justify-center text-white cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href="#about"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-[#aaaaaa] hover:text-white ml-3"
            >
              <span>Scroll</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
