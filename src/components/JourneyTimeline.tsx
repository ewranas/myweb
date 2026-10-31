import React from 'react';
import { timelineMilestones } from '../data/portfolioData';

export const JourneyTimeline: React.FC = () => {
  return (
    <section id="journey" className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 bg-[#050505]">
      <div className="max-w-4xl mx-auto text-left">
        
        {/* Section Heading */}
        <div className="mb-16 sm:mb-20 space-y-2">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#888888] uppercase">
            04 / TRAJECTORY
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f5f5]">
            Always Learning.
          </h2>
          <p className="text-sm text-[#888888] max-w-lg">
            A continuous progression from personal curiosity to practical software development.
          </p>
        </div>

        {/* Minimal Editorial Vertical Timeline */}
        <div className="space-y-10 border-l border-white/[0.08] pl-6 sm:pl-10 ml-2">
          {timelineMilestones.map((milestone) => (
            <div key={milestone.id} className="relative group space-y-2">
              
              {/* Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#333333] border-2 border-[#050505] group-hover:bg-[#f5f5f5] transition-colors" />

              {/* Year / Period */}
              <span className="text-xs font-mono text-[#888888] tracking-widest uppercase block">
                {milestone.period}
              </span>

              {/* Phase Headline */}
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#f5f5f5]">
                {milestone.phase}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed max-w-2xl font-normal">
                {milestone.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
