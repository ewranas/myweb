import React from 'react';
import { timelineMilestones } from '../data/portfolioData';

export const JourneyTimeline: React.FC = () => {
  return (
    <section id="journey" className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-16 bg-[#050505]">
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
          <div className="absolute left-[-2px] w-[4px] h-36 bg-gradient-to-b from-transparent via-rose-500 to-transparent animate-timeline-glow pointer-events-none rounded-full shadow-[0_0_12px_#f43f5e]" />

          {timelineMilestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="reveal-item glow-card relative group p-6 sm:p-7 rounded-2xl bg-white/[0.015] hover:bg-white/[0.035] border border-white/[0.05] hover:border-rose-500/30 transition-all duration-300"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              
              {/* Bullet Node with Glow */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-6 flex items-center justify-center">
                {milestone.isCurrent ? (
                  <>
                    <span className="absolute w-6 h-6 rounded-full bg-rose-500/25 animate-badge-ping pointer-events-none" />
                    <span className="absolute w-3.5 h-3.5 rounded-full bg-rose-500/40 animate-ping pointer-events-none" />
                    <div className="relative w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-[#050505] shadow-[0_0_12px_#ef4444]" />
                  </>
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#333333] border-2 border-[#050505] group-hover:bg-rose-400 group-hover:scale-125 transition-all shadow-sm group-hover:shadow-[0_0_8px_#f43f5e]" />
                )}
              </div>

              {/* Year / Period */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#888888] tracking-widest uppercase block group-hover:text-rose-400 transition-colors">
                  {milestone.period}
                </span>
                {milestone.isCurrent && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-[9px] font-mono text-rose-300 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                    <span>CURRENT FOCUS</span>
                  </span>
                )}
              </div>

              {/* Phase Headline */}
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#f5f5f5] pt-1 group-hover:text-white transition-colors">
                {milestone.phase}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed max-w-2xl font-normal pt-1 group-hover:text-[#aaaaaa] transition-colors">
                {milestone.description}
              </p>

              {/* Key Competencies / Skills pills with interactive hover glow */}
              {milestone.skillsAcquired && milestone.skillsAcquired.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {milestone.skillsAcquired.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.03] text-[#aaaaaa] border border-white/[0.05] hover:border-rose-500/40 hover:text-white hover:bg-white/[0.06] transition-all cursor-default"
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
