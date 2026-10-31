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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 border-b border-white/[0.06]">
          <div className="space-y-1.5">
            <h4 className="font-editorial text-lg font-bold text-[#f5f5f5]">
              Designed & Built by Anas Ahammed.
            </h4>
            <p className="text-xs text-[#888888] font-normal tracking-wide">
              Always Learning. Always Building.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 text-[#888888]">
            <a
              href="https://github.com/zerolap657-design"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f5f5f5] transition-colors p-1"
              title="GitHub"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://www.instagram.com/_mr_solstice?rpxt=MTJqMnNqcnd1cXF2dQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f5f5f5] transition-colors p-1"
              title="Instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href="https://www.facebook.com/share/1KPsNUo1Rz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f5f5f5] transition-colors p-1"
              title="Facebook"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <a
              href="mailto:anasexp10@gmail.com"
              className="hover:text-[#f5f5f5] transition-colors p-1"
              title="Email"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#888888] hover:text-[#f5f5f5] transition-colors cursor-pointer ml-2"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
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
