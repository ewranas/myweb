import React, { useState } from 'react';
import {
  Terminal,
  FileCode2,
  Palette,
  Code2,
  Globe,
  Cpu,
  Lightbulb,
  Compass,
  Sparkles,
  Info,
} from 'lucide-react';
import { skillItems } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All Technologies' },
    { id: 'languages', label: 'Languages' },
    { id: 'web', label: 'Web' },
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: 'exploration', label: 'Exploration' },
  ];

  const filteredSkills = skillItems.filter((skill) => {
    if (activeTab === 'all') return true;
    return skill.category === activeTab;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return Terminal;
      case 'FileCode2':
        return FileCode2;
      case 'Palette':
        return Palette;
      case 'Code2':
        return Code2;
      case 'Globe':
        return Globe;
      case 'Cpu':
        return Cpu;
      case 'Lightbulb':
        return Lightbulb;
      case 'Compass':
        return Compass;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#000000]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2997ff] font-mono">
            Technologies & Skills
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#f5f5f7]">
            Tools of the Craft.
          </h2>
          <p className="text-[#86868b] text-base max-w-xl">
            A transparent overview of the technologies and concepts I am actively learning, studying, and implementing.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-[#86868b] bg-[#161617]/70 px-4 py-1.5 rounded-full border border-white/[0.06]">
            <Info className="w-3.5 h-3.5 text-[#2997ff]" />
            <span>Honest representation: Focused on continuous exploration and foundational growth.</span>
          </div>
        </div>

        {/* Minimal Apple-style Segmented Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#161617]/90 rounded-full border border-white/[0.08] max-w-fit mx-auto mb-14">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white/[0.12] text-white shadow-sm'
                  : 'text-[#86868b] hover:text-[#f5f5f7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => {
            const Icon = getIcon(skill.icon);

            return (
              <div
                key={skill.id}
                className="apple-glass-card p-6 rounded-3xl border border-white/[0.08] text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#2997ff] group-hover:bg-[#2997ff] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] bg-white/[0.03] px-2 py-0.5 rounded">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#f5f5f7]">
                    {skill.name}
                  </h3>

                  <span className="text-xs text-[#2997ff] font-medium block mt-0.5">
                    {skill.levelStatus}
                  </span>

                  <p className="text-xs text-[#86868b] mt-3 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1">
                    {skill.keyTopics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/[0.03] text-[#a1a1a6] font-mono"
                      >
                        {topic}
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
