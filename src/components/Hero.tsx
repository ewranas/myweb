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

  // Touch swipe and parallax support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    if (e.targetTouches[0]) {
      const touch = e.targetTouches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 1.5;
      const y = ((touch.clientY - rect.top) / rect.height - 0.5) * 1.5;
      setMouseOffset({ x, y });
    }
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
    setMouseOffset({ x: 0, y: 0 });
  };

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
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
      className="relative w-full h-[100dvh] min-h-[640px] sm:min-h-[680px] overflow-hidden select-none bg-[#050505] bg-grain"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMouseOffset({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('button, a, input')) {
          window.dispatchEvent(new CustomEvent('trigger-lightning'));
        }
      }}
    >
      {/* Background Slides with smooth fade */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlideIndex;
        const imgSrc = slide.backgroundImage?.startsWith('/src/')
          ? slide.backgroundImage.replace('/src/', '/')
          : (slide.backgroundImage || '/assets/images/hero_moon_skyscraper_1793472035293.jpg');

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Architectural Cityscape Artwork */}
            <img
              src={imgSrc}
              alt={slide.title}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter grayscale contrast-[1.08] brightness-[0.82]"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.includes('hero_moon_skyscraper_1793472035293.jpg')) {
                  target.src = '/assets/images/hero_moon_skyscraper_1793472035293.jpg';
                }
              }}
            />

            {/* Cinematic Gradient Overlays to preserve legibility and atmospheric fog */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/85 via-[#050505]/30 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#050505]/80 to-transparent" />
          </div>
        );
      })}

      {/* Atmospheric Celestial Layer: Red Moon & Subtly Red-Tinted Drifting Clouds */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        
        {/* Ambient Crimson Sky Glow with Breathing Aura */}
        <div 
          className="absolute top-0 right-0 w-[85vw] max-w-[1000px] h-[580px] blur-3xl animate-red-aura"
          style={{
            background: 'radial-gradient(circle at 75% 30%, rgba(225, 29, 72, 0.28) 0%, rgba(185, 28, 28, 0.16) 40%, rgba(153, 27, 27, 0.05) 70%, transparent 85%)'
          }}
        />

        {/* Cinematic Red Moon with 3D Mouse Parallax and Floating Animation */}
        <div 
          className="absolute top-12 sm:top-14 right-[6%] sm:right-[14%] lg:right-[18%]"
          style={{
            transform: `translate3d(${mouseOffset.x * -18}px, ${mouseOffset.y * -14}px, 0)`,
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="relative w-28 h-28 sm:w-44 sm:h-44 lg:w-56 lg:h-56 animate-red-moon-float">
            
            {/* Outer Red Lunar Aura Glow */}
            <div className="absolute inset-[-25%] rounded-full bg-red-600/25 blur-2xl animate-red-aura" />
            <div className="absolute inset-[-12%] rounded-full bg-rose-500/30 blur-xl" />

            {/* Detailed Blood-Red Moon Sphere */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full rounded-full shadow-[0_0_55px_rgba(239,68,68,0.5)]"
            >
              <defs>
                {/* Radial gradient for the red moon body */}
                <radialGradient id="redMoonGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#ff4d6d" />
                  <stop offset="30%" stopColor="#e11d48" />
                  <stop offset="65%" stopColor="#be123c" />
                  <stop offset="90%" stopColor="#881337" />
                  <stop offset="100%" stopColor="#4c0519" />
                </radialGradient>

                {/* Darker red crater gradient */}
                <radialGradient id="craterGrad" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#4c0519" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#881337" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#be123c" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Base Moon Sphere */}
              <circle cx="100" cy="100" r="98" fill="url(#redMoonGrad)" />

              {/* Surface Maria / Dark Lunar Basins */}
              <path
                d="M45,65 Q70,45 110,55 Q135,70 125,100 Q105,120 75,115 Q45,105 45,65 Z"
                fill="url(#craterGrad)"
                opacity="0.65"
              />
              <path
                d="M100,105 Q140,95 160,120 Q170,145 145,160 Q115,165 95,145 Q85,125 100,105 Z"
                fill="url(#craterGrad)"
                opacity="0.6"
              />
              <path
                d="M60,125 Q85,120 95,140 Q90,165 70,170 Q50,165 45,145 Q45,130 60,125 Z"
                fill="url(#craterGrad)"
                opacity="0.55"
              />

              {/* Distinctive Craters */}
              <circle cx="68" cy="82" r="14" fill="#3f0713" opacity="0.45" />
              <circle cx="67" cy="81" r="13" stroke="#ff758f" strokeWidth="1" fill="none" opacity="0.3" />
              
              <circle cx="132" cy="74" r="18" fill="#3f0713" opacity="0.5" />
              <circle cx="130" cy="73" r="17" stroke="#ff758f" strokeWidth="1" fill="none" opacity="0.25" />

              <circle cx="118" cy="138" r="22" fill="#3f0713" opacity="0.55" />
              <circle cx="116" cy="136" r="20" stroke="#ff758f" strokeWidth="1.2" fill="none" opacity="0.3" />

              <circle cx="152" cy="115" r="9" fill="#3f0713" opacity="0.4" />
              <circle cx="78" cy="148" r="11" fill="#3f0713" opacity="0.45" />

              {/* Tycho-like ray crater at bottom */}
              <circle cx="102" cy="168" r="7" fill="#ff4d6d" opacity="0.75" />
              <circle cx="102" cy="168" r="5" fill="#ffffff" opacity="0.4" />

              {/* 3D Sphere Edge Crescent Shadow (Gives Depth) */}
              <path
                d="M100,2 A98,98 0 0,0 100,198 A98,98 0 0,1 100,2 Z"
                fill="#2a040d"
                opacity="0.22"
              />

              {/* Outer Rim Glow */}
              <circle cx="100" cy="100" r="97" stroke="#ff758f" strokeWidth="1.5" fill="none" opacity="0.4" />
            </svg>

            {/* Rising Lunar Crimson Embers (Floating Stardust Particles) */}
            <div className="absolute inset-0 overflow-visible pointer-events-none">
              <span className="absolute bottom-4 left-6 w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#ff4d6d] animate-ember-1" />
              <span className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-red-400 shadow-[0_0_10px_#ef4444] animate-ember-2" />
              <span className="absolute bottom-2 left-1/2 w-1 h-1 rounded-full bg-rose-300 shadow-[0_0_6px_#fda4af] animate-ember-3" />
              <span className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#dc2626] animate-ember-4" />
              <span className="absolute bottom-6 right-1/4 w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#fb7185] animate-ember-5" />
              <span className="absolute bottom-12 right-12 w-1 h-1 rounded-full bg-red-300 shadow-[0_0_6px_#fca5a5] animate-ember-6" />
            </div>

          </div>
        </div>

        {/* Subtly Red-Tinted Clouds Layer 1 (Drifting Flow 1 Across Sky) */}
        <div 
          className="absolute top-2 sm:top-6 -left-[15%] w-[130%] h-64 sm:h-80 opacity-85 mix-blend-screen"
          style={{
            transform: `translate3d(${mouseOffset.x * 14}px, ${mouseOffset.y * 10}px, 0)`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="w-full h-full animate-cloud-flow-1">
            {/* Cloud Formation Alpha */}
            <div 
              className="absolute top-6 right-[24%] w-[480px] sm:w-[720px] h-32 sm:h-44 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(225, 29, 72, 0.26) 0%, rgba(190, 18, 60, 0.15) 45%, transparent 75%)'
              }}
            />
            {/* Cloud Formation Beta */}
            <div 
              className="absolute top-0 right-[6%] w-[400px] sm:w-[580px] h-28 sm:h-36 rounded-full blur-2xl"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(244, 63, 94, 0.22) 0%, rgba(159, 18, 57, 0.12) 50%, transparent 80%)'
              }}
            />
          </div>
        </div>

        {/* Subtly Red-Tinted Clouds Layer 2 (Counter-Flow Drifting Across Sky) */}
        <div 
          className="absolute top-6 sm:top-14 -right-[10%] w-[125%] h-72 opacity-80 mix-blend-screen"
          style={{
            transform: `translate3d(${mouseOffset.x * -12}px, ${mouseOffset.y * -8}px, 0)`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="w-full h-full animate-cloud-flow-2">
            {/* Cloud Wisps that pass over the Moon */}
            <div 
              className="absolute top-12 right-[10%] sm:right-[15%] w-[300px] sm:w-[440px] h-20 sm:h-28 rounded-full blur-2xl"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(251, 113, 133, 0.3) 0%, rgba(225, 29, 72, 0.18) 40%, rgba(136, 19, 55, 0.07) 70%, transparent 85%)'
              }}
            />
            {/* Wider Atmospheric Cloud Mist */}
            <div 
              className="absolute top-24 right-[1%] sm:right-[4%] w-[460px] sm:w-[640px] h-24 sm:h-32 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(225, 29, 72, 0.2) 0%, rgba(159, 18, 57, 0.1) 50%, transparent 75%)'
              }}
            />
          </div>
        </div>

        {/* Wispy Cloud Directly Passing Over the Moon */}
        <div className="absolute top-16 sm:top-20 right-[5%] sm:right-[12%] lg:right-[16%] w-72 sm:w-96 h-28 pointer-events-none mix-blend-screen opacity-75">
          <div 
            className="w-full h-full rounded-full blur-xl animate-cloud-wisp"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(253, 164, 175, 0.32) 0%, rgba(225, 29, 72, 0.22) 40%, transparent 75%)'
            }}
          />
        </div>

        {/* Soft Red-Tinted Atmospheric Horizon Mist at very top */}
        <div 
          className="absolute top-0 left-0 right-0 h-32 sm:h-40 opacity-70"
          style={{
            background: 'linear-gradient(180deg, rgba(136, 19, 55, 0.22) 0%, rgba(88, 28, 28, 0.1) 50%, transparent 100%)'
          }}
        />
      </div>


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
      <div className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2.5 sm:gap-3">
        <button
          onClick={handleNext}
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#111111]/80 hover:bg-[#222222] border border-white/[0.12] backdrop-blur-xl flex items-center justify-center text-[#f5f5f5] hover:scale-105 transition-all cursor-pointer shadow-2xl"
          aria-label="Next slide"
        >
          <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {currentSlideIndex > 0 && (
          <button
            onClick={handlePrev}
            className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#111111]/60 hover:bg-[#222222] border border-white/[0.08] backdrop-blur-xl flex items-center justify-center text-[#888888] hover:text-[#f5f5f5] transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
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
