/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialPersonalInfo, initialProjects } from './data/portfolioData';
import { PersonalInfo, ProjectItem } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneyTimeline } from './components/JourneyTimeline';
import { EducationSection } from './components/EducationSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const saved = localStorage.getItem('anas_portfolio_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.photoUrl || parsed.photoUrl.includes('anas_profile_portrait_1793470981773') || parsed.photoUrl.startsWith('/src/')) {
          parsed.photoUrl = '/assets/images/anas_profile_real.jpg';
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return initialPersonalInfo;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('anas_portfolio_projects');
      if (saved) {
        const parsed: ProjectItem[] = JSON.parse(saved);
        const updatedList = parsed.map((p) => {
          if (p.image && p.image.startsWith('/src/')) {
            p.image = p.image.replace('/src/', '/');
          }
          if (p.id === 'folafol') {
            if (!p.videoUrl) {
              p.videoUrl = 'https://res.cloudinary.com/fcsclifx/video/upload/v1793473651/WhatsApp_Video_2026-10-31_at_12.06.45_PM.mp4';
            }
            if (!p.liveDemoUrl || p.liveDemoUrl === '#' || p.liveDemoUrl.trim() === '') {
              p.liveDemoUrl = 'https://folafol-web.vercel.app/';
            }
          }
          if (p.id === 'dev-workspace-suite' || p.id === 'my-introduction') {
            return {
              ...p,
              id: 'my-introduction',
              title: 'My Introduction',
              badge: 'Portfolio Showreel',
              category: 'Interactive Audio-Visual Showreel',
              description:
                'An interactive portfolio showreel introducing Anas Ahamed — exploring software craft, digital experiences, system tools, and development vision.',
              technologies: ['Interactive Canvas', 'Audio Synthesis', 'CSS Keyframes', 'Showreel'],
              githubUrl: p.githubUrl || 'https://github.com/zerolap657-design',
              liveDemoUrl: '/assets/aistudio/ANAS_AHAMED___Portfolio_Showreel_1a936da6.html',
              embedUrl: '/assets/aistudio/ANAS_AHAMED___Portfolio_Showreel_1a936da6.html',
            };
          }
          if (p.id === 'hsc-science-reference' || p.id === 'messboi') {
            const messboiItem = initialProjects.find((item) => item.id === 'messboi');
            return messboiItem || p;
          }
          return p;
        });

        if (!updatedList.some((p) => p.id === 'my-introduction' || p.embedUrl?.includes('ANAS_AHAMED___Portfolio_Showreel'))) {
          const introItem = initialProjects.find((p) => p.id === 'my-introduction');
          if (introItem) {
            updatedList.splice(1, 0, introItem);
          }
        }
        if (!updatedList.some((p) => p.id === 'messboi' || p.liveDemoUrl?.includes('messboi1.netlify.app'))) {
          const messboiItem = initialProjects.find((p) => p.id === 'messboi');
          if (messboiItem) {
            updatedList.push(messboiItem);
          }
        }
        return updatedList;
      }
    } catch {
      // fallback
    }
    return initialProjects;
  });

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track active section for navigation highlighting & observe scroll reveals
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'journey', 'education'];

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) navObserver.observe(el);
    });

    // Scroll reveal observer for .reveal-item, .reveal-left, .reveal-right, .reveal-scale
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll(
      '.reveal-item, .reveal-left, .reveal-right, .reveal-scale'
    );
    revealElements.forEach((el) => revealObserver.observe(el));

    // Scroll progress handler
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      navObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Subtle interactive ambient cursor spotlight with touch support
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        setCursorPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f5f5f5] flex flex-col selection:bg-rose-500/30 selection:text-white">
      {/* Sleek Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-white/[0.04]">
        <div
          className="h-full bg-gradient-to-r from-rose-600 via-red-500 to-amber-300 transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(244,63,94,0.9)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Ambient Atmospheric Deep Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[25%] -left-[10%] w-[500px] h-[500px] rounded-full bg-rose-600/[0.025] blur-[140px] animate-pulse-glow" />
        <div className="absolute top-[55%] -right-[10%] w-[550px] h-[550px] rounded-full bg-red-600/[0.022] blur-[160px] animate-float-smooth" />
        <div className="absolute top-[80%] left-[20%] w-[450px] h-[450px] rounded-full bg-amber-600/[0.015] blur-[150px] animate-pulse-glow" />
      </div>

      {/* Ambient Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 opacity-70"
        style={{
          background:
            cursorPos.x === -1000
              ? 'radial-gradient(650px circle at 50% 35%, rgba(225, 29, 72, 0.05), rgba(255, 255, 255, 0.015) 45%, transparent 75%)'
              : `radial-gradient(650px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(225, 29, 72, 0.045), rgba(255, 255, 255, 0.018) 45%, transparent 75%)`,
        }}
      />

      {/* Floating Center Navigation Pill */}
      <Navbar
        onOpenContactModal={() => setContactModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        
        {/* 1. Cinematic Hero Section with 4-Slide Fullscreen Carousel */}
        <Hero
          personalInfo={personalInfo}
          onOpenContactModal={() => setContactModalOpen(true)}
          onExploreProjects={() => {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Editorial About Section */}
        <AboutSection personalInfo={personalInfo} />

        {/* 3. Selected Projects (Featuring FOLAFOL Studio Presentation) */}
        <ProjectsSection projects={projects} />

        {/* 4. Developer Journey (Always Learning) */}
        <JourneyTimeline />

        {/* 5. Minimal Education Section */}
        <EducationSection />

      </main>

      {/* Footer */}
      <Footer socials={personalInfo.socials} />

      {/* Contact Modal (Centered, blurred background) */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        email={personalInfo.socials.email}
      />
    </div>
  );
}
