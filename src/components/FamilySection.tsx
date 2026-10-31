import React from 'react';
import { Heart } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';

interface FamilySectionProps {
  personalInfo: PersonalInfo;
}

export const FamilySection: React.FC<FamilySectionProps> = ({ personalInfo }) => {
  return (
    <section id="family" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0c]">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Minimal Kicker */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-[#86868b] text-xs font-mono mb-8 border border-white/[0.06]">
          <Heart className="w-3.5 h-3.5 text-[#ff375f]" />
          <span>Gratitude & Inspiration</span>
        </div>

        {/* Apple Style Editorial Typography Card */}
        <div className="apple-glass-card p-10 sm:p-16 rounded-3xl border border-white/[0.08] shadow-2xl relative">
          <div className="space-y-6 max-w-2xl mx-auto">
            
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#f5f5f7]">
              Behind Every Dream.
            </h2>

            <div className="space-y-4 text-base sm:text-xl text-[#a1a1a6] leading-relaxed font-normal">
              <p className="text-[#f5f5f7]">
                &quot;Behind every dream is a family that inspires it.
              </p>
              <p>
                I am grateful to have a family of four — my father, mother, older sister, and me. Their support motivates me to keep learning, growing, and working toward my dreams.&quot;
              </p>
            </div>

            {/* Quiet member representation */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-[#86868b]">
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#f5f5f7]">
                Father
              </span>
              <span className="text-[#48484a]">·</span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#f5f5f7]">
                Mother
              </span>
              <span className="text-[#48484a]">·</span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#f5f5f7]">
                Older Sister
              </span>
              <span className="text-[#48484a]">·</span>
              <span className="px-3 py-1 rounded-full bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff] font-medium">
                Anas
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
