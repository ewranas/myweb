import React from 'react';
import { ArrowUp, Github, Instagram, Facebook, Mail } from 'lucide-react';
import { SocialLinks } from '../types/portfolio';

interface FooterProps {
  socials: SocialLinks;
}

export const Footer: React.FC<FooterProps> = ({ socials }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#050505] pt-16 pb-12 px-6 sm:px-12 lg:px-16 text-left">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Top Info & Quotes */}
        <div className="reveal-item flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 border-b border-white/[0.06]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for projects & learning collaborations</span>
            </div>
            <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#f5f5f5]">
              Designed & Built by Anas Ahammed.
            </h4>
            <p className="text-xs text-[#888888] font-normal tracking-wide flex items-center gap-2">
              <span>Always Learning. Always Building.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </p>
          </div>

          {/* Social Links with Hover Elevation and Subtle Halo */}
          <div className="flex items-center gap-3 sm:gap-4 text-[#888888]">
            {[
              { href: 'https://github.com/zerolap657-design', icon: Github, title: 'GitHub' },
              { href: 'https://www.instagram.com/_mr_solstice?rpxt=MTJqMnNqcnd1cXF2dQ==', icon: Instagram, title: 'Instagram' },
              { href: 'https://www.facebook.com/share/1KPsNUo1Rz/', icon: Facebook, title: 'Facebook' },
              { href: 'mailto:anasexp10@gmail.com', icon: Mail, title: 'Email' },
            ].map((soc, idx) => {
              const Icon = soc.icon;
              return (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/[0.03] hover:bg-white/[0.1] hover:text-[#f5f5f5] hover:scale-125 hover:-translate-y-1 transition-all duration-300 border border-white/[0.06] hover:border-rose-500/40 shadow-sm hover:shadow-[0_0_20px_rgba(225,29,72,0.25)]"
                  title={soc.title}
                  aria-label={soc.title}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}

            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-white/[0.05] hover:bg-rose-500/20 text-[#888888] hover:text-[#f5f5f5] hover:scale-125 hover:-translate-y-1 transition-all duration-300 border border-white/[0.08] hover:border-rose-500/40 cursor-pointer ml-1 shadow-sm hover:shadow-[0_0_20px_rgba(225,29,72,0.3)] group"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Year and Location */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#555555]">
          <p>
            Copyright © {currentYear} Anas Ahammed.
          </p>
          <p>
            Shahid AHM Kamaruzzaman College · Natore, Bangladesh
          </p>
        </div>

      </div>
    </footer>
  );
};
