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
import { CustomizerModal } from './components/CustomizerModal';
import { ProjectEditModal } from './components/ProjectEditModal';

export default function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const saved = localStorage.getItem('anas_portfolio_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.photoUrl || parsed.photoUrl.includes('anas_profile_portrait_1793470981773')) {
          parsed.photoUrl = '/src/assets/images/anas_profile_real.jpg';
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
        return parsed.map((p) => {
          if (p.id === 'folafol' && !p.videoUrl) {
            return {
              ...p,
              videoUrl: 'https://res.cloudinary.com/fcsclifx/video/upload/v1793473651/WhatsApp_Video_2026-10-31_at_12.06.45_PM.mp4',
            };
          }
          return p;
        });
      }
    } catch {
      // fallback
    }
    return initialProjects;
  });

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [projectEditOpen, setProjectEditOpen] = useState(false);
  const [currentEditProject, setCurrentEditProject] = useState<ProjectItem | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

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

    // Scroll reveal observer for .reveal-item
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-item');
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      navObserver.disconnect();
      revealObserver.disconnect();
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

  const handleUpdatePersonalInfo = (updated: PersonalInfo) => {
    setPersonalInfo(updated);
    try {
      localStorage.setItem('anas_portfolio_info', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetToDefaults = () => {
    setPersonalInfo(initialPersonalInfo);
    try {
      localStorage.removeItem('anas_portfolio_info');
    } catch {
      // ignore
    }
  };

  const handleSaveProject = (updatedProject: ProjectItem) => {
    const existingIndex = projects.findIndex((p) => p.id === updatedProject.id);
    let updatedList: ProjectItem[];

    if (existingIndex >= 0) {
      updatedList = [...projects];
      updatedList[existingIndex] = updatedProject;
    } else {
      updatedList = [...projects, updatedProject];
    }

    setProjects(updatedList);
    try {
      localStorage.setItem('anas_portfolio_projects', JSON.stringify(updatedList));
    } catch {
      // ignore
    }
  };

  const handleDeleteProject = (projectId: string) => {
    const filtered = projects.filter((p) => p.id !== projectId);
    setProjects(filtered);
    try {
      localStorage.setItem('anas_portfolio_projects', JSON.stringify(filtered));
    } catch {
      // ignore
    }
    setProjectEditOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f5f5f5] flex flex-col selection:bg-white/20 selection:text-white">
      
      {/* Global Unified Cinematic Dark Burgundy and Black Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Base dark canvas */}
        <div className="absolute inset-0 bg-[#050505]" />

        {/* Top-Right Burgundy/Crimson Ambient Glow (Behind Orb in Hero) */}
        <div
          className="absolute top-[-5%] right-[-10%] sm:right-[5%] w-[420px] sm:w-[750px] h-[420px] sm:h-[750px] rounded-full blur-[110px] opacity-50 sm:opacity-35"
          style={{
            background:
              'radial-gradient(circle, rgba(225, 29, 72, 0.32) 0%, rgba(159, 18, 57, 0.18) 40%, rgba(76, 5, 25, 0.08) 70%, transparent 85%)',
          }}
        />

        {/* Mid-Page Burgundy Glow (Extends across About and Selected Work) */}
        <div
          className="absolute top-[32%] left-[-15%] sm:left-[-5%] w-[380px] sm:w-[680px] h-[380px] sm:h-[680px] rounded-full blur-[120px] opacity-45 sm:opacity-25"
          style={{
            background:
              'radial-gradient(circle, rgba(190, 18, 60, 0.25) 0%, rgba(136, 19, 55, 0.14) 45%, rgba(76, 5, 25, 0.06) 70%, transparent 80%)',
          }}
        />

        {/* Lower-Page Crimson/Burgundy Atmosphere (Extends across Projects & Journey) */}
        <div
          className="absolute top-[62%] right-[-12%] sm:right-[-2%] w-[360px] sm:w-[620px] h-[360px] sm:h-[620px] rounded-full blur-[130px] opacity-40 sm:opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(225, 29, 72, 0.22) 0%, rgba(159, 18, 57, 0.12) 50%, transparent 80%)',
          }}
        />

        {/* Subtle Nocturne Film Grain Texture across entire page */}
        <div className="absolute inset-0 bg-grain opacity-70 mix-blend-overlay" />
      </div>

      {/* Ambient Interactive Cursor Spotlight with touch support */}
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
        <AboutSection
          personalInfo={personalInfo}
          onOpenCustomizer={() => setCustomizerOpen(true)}
        />

        {/* 3. Selected Projects (Featuring FOLAFOL Studio Presentation) */}
        <ProjectsSection
          projects={projects}
          onEditProject={(project) => {
            setCurrentEditProject(project);
            setProjectEditOpen(true);
          }}
          onAddNewProject={() => {
            setCurrentEditProject(null);
            setProjectEditOpen(true);
          }}
        />

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

      {/* Customizer Modal for Photo & Socials */}
      <CustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        personalInfo={personalInfo}
        onUpdatePersonalInfo={handleUpdatePersonalInfo}
        onResetToDefaults={handleResetToDefaults}
      />

      {/* Project Add / Edit Modal */}
      <ProjectEditModal
        isOpen={projectEditOpen}
        onClose={() => setProjectEditOpen(false)}
        project={currentEditProject}
        onSave={handleSaveProject}
        onDelete={handleDeleteProject}
      />

    </div>
  );
}
