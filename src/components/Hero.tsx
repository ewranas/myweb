import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Github,
  Instagram,
  Facebook,
  Mail,
  ArrowUpRight,
} from 'lucide-react';
import { heroSlides } from '../data/portfolioData';
import { PersonalInfo } from '../types/portfolio';

interface HeroProps {
  personalInfo: PersonalInfo;
  onOpenContactModal: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  personalInfo,
  onOpenContactModal,
  onExploreProjects,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = heroSlides.length;
  const currentSlide = heroSlides[currentSlideIndex];

  // Automatic slide rotation every 5.5 seconds
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 5500);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, totalSlides, currentSlideIndex]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const scrollToNextSection = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[680px] overflow-hidden select-none bg-[#050505] bg-grain"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides with smooth fade */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Cinematic Grayscale Artwork */}
            <img
              src={slide.backgroundImage}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter grayscale contrast-[1.08] brightness-[0.82]"
            />

            {/* Cinematic Gradient Overlays to preserve legibility and atmospheric fog */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/85 via-[#050505]/30 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#050505]/80 to-transparent" />
          </div>
        );
      })}

      {/* Hero Content Container */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-end pb-16 sm:pb-20">
        
        {/* Main Content (Positioned Lower-Left) */}
        <div className="max-w-2xl text-left space-y-4">
          
          {/* Subtle Tagline / Slide Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#888888] uppercase">
              {currentSlide.tagline}
            </span>
          </div>

          {/* Large Editorial Heading */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f5f5f5] leading-[1.05]">
            {currentSlide.title}
          </h1>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl font-light tracking-tight text-[#cccccc]">
            {currentSlide.subtitle}
          </h2>

          {/* Description (2-3 short lines max) */}
          <p className="text-xs sm:text-sm text-[#888888] leading-relaxed max-w-lg font-normal">
            {currentSlide.description}
          </p>

          {/* Slide CTA Button */}
          <div className="pt-2">
            {currentSlideIndex === 3 ? (
              <button
                onClick={onOpenContactModal}
                className="btn-minimal-white px-5 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{currentSlide.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <a
                href={currentSlide.actionTarget}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(currentSlide.actionTarget);
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-minimal-white px-5 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{currentSlide.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Minimal Social Icons (Always Visible) */}
          <div className="pt-4 flex items-center gap-5 text-[#888888]">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f5f5f5] transition-colors p-1"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f5f5f5] transition-colors p-1"
              title="Instagram Profile"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f5f5f5] transition-colors p-1"
              title="Facebook Profile"
              aria-label="Facebook Profile"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personalInfo.socials.email}`}
              className="hover:text-[#f5f5f5] transition-colors p-1"
              title="Email Anas"
              aria-label="Email Anas"
            >
              <Mail className="w-4 h-4" />
            </a>

            <span className="text-[#333333]">|</span>

            <span className="text-[11px] font-mono text-[#666666]">
              Natore, Bangladesh
            </span>
          </div>

        </div>

      </div>

      {/* Carousel Navigation Arrow Button (Right Side) */}
      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        <button
          onClick={handleNext}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#111111]/80 hover:bg-[#222222] border border-white/[0.12] backdrop-blur-xl flex items-center justify-center text-[#f5f5f5] hover:scale-105 transition-all cursor-pointer shadow-2xl"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {currentSlideIndex > 0 && (
          <button
            onClick={handlePrev}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#111111]/60 hover:bg-[#222222] border border-white/[0.08] backdrop-blur-xl flex items-center justify-center text-[#888888] hover:text-[#f5f5f5] transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {/* Next Section Indicator (Bottom Right) */}
      <div className="hidden sm:flex absolute bottom-8 right-12 z-30 items-center gap-2 text-[11px] font-mono text-[#666666] hover:text-[#f5f5f5] transition-colors cursor-pointer"
        onClick={scrollToNextSection}
      >
        <span>SCROLL DOWN</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </div>

    </section>
  );
};
