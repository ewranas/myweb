import React from 'react';
import {
  Terminal,
  Code2,
  Compass,
  BookOpen,
  Rocket,
  Globe,
  Sparkles,
} from 'lucide-react';
import { personalInterests } from '../data/portfolioData';

export const InterestsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return Terminal;
      case 'Code2':
        return Code2;
      case 'Compass':
        return Compass;
      case 'BookOpen':
        return BookOpen;
      case 'Rocket':
        return Rocket;
      case 'Globe':
        return Globe;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="interests" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#000000]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2997ff] font-mono">
            Personal Interests
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#f5f5f7]">
            What Inspires My Curiosity.
          </h2>
          <p className="text-[#86868b] text-base max-w-xl">
            The core fascinations that drive my coding journey and daily learning habits.
          </p>
        </div>

        {/* 6 Minimal Apple-Style Interest Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalInterests.map((interest) => {
            const Icon = getIcon(interest.icon);

            return (
              <div
                key={interest.id}
                className="apple-glass-card p-7 rounded-3xl border border-white/[0.08] text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#2997ff] mb-5 group-hover:bg-[#2997ff] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-bold text-[#f5f5f7] tracking-tight mb-2">
                    {interest.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                    {interest.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {interest.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-[#a1a1a6]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
