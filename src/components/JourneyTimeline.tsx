import React from 'react';
import { timelineMilestones } from '../data/portfolioData';

export const JourneyTimeline: React.FC = () => {
  return (
    <section id="journey" className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 bg-transparent">
      <div className="max-w-4xl mx-auto text-left">
        
        {/* Section Heading */}
        <div className="reveal-item mb-16 sm:mb-20 space-y-2">
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

        {/* Minimal Editorial Vertical Timeline with Animated Traveling Laser Beam */}
        <div className="relative border-l border-white/[0.08] pl-6 sm:pl-10 ml-2 space-y-12">
          
          {/* Animated Laser Pulse Traveling Down the Timeline */}
          <div className="absolute left-[-1.5px] w-[3px] h-32 bg-gradient-to-b from-transparent via-rose-500/80 to-transparent animate-timeline-glow pointer-events-none" />

          {timelineMilestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="reveal-item relative group p-6 rounded-2xl bg-white/[0.015] hover:bg-white/[0.035] border border-transparent hover:border-white/[0.08] transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              
              {/* Bullet Node with Glow */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-6 flex items-center justify-center">
                {milestone.isCurrent ? (
                  <>
                    <span className="absolute w-5 h-5 rounded-full bg-rose-500/30 animate-badge-ping" />
                    <div className="w-3 h-3 rounded-full bg-rose-500 border-2 border-[#050505] shadow-[0_0_10px_#ef4444]" />
                  </>
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#333333] border-2 border-[#050505] group-hover:bg-[#f5f5f5] group-hover:scale-125 transition-all shadow-sm" />
                )}
              </div>

              {/* Year / Period */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#888888] tracking-widest uppercase block group-hover:text-rose-400/90 transition-colors">
                  {milestone.period}
                </span>
                {milestone.isCurrent && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-[9px] font-mono text-rose-300 uppercase tracking-wider">
                    CURRENT FOCUS
                  </span>
                )}
              </div>

              {/* Phase Headline */}
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#f5f5f5] pt-1">
                {milestone.phase}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed max-w-2xl font-normal pt-1">
                {milestone.description}
              </p>

              {/* Key Competencies / Skills pills */}
              {milestone.skillsAcquired && milestone.skillsAcquired.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {milestone.skillsAcquired.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-[#aaaaaa] border border-white/[0.05] group-hover:border-white/[0.1] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
