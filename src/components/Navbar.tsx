import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

interface NavbarProps {
  onOpenContactModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Center Navigation Pill (Desktop) */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto nav-pill px-4 sm:px-5 py-2 rounded-full flex items-center gap-3 sm:gap-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300">
          
          {/* Logo Monogram */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group text-[#f5f5f5] hover:text-white transition-colors"
          >
            <span className="font-editorial text-sm font-bold tracking-widest text-[#f5f5f5]">
              AA
            </span>
            <span className="w-1 h-1 rounded-full bg-[#f5f5f5]/40 group-hover:bg-[#f5f5f5] transition-colors" />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden sm:flex items-center gap-5 text-xs text-[#888888] font-normal tracking-wide">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`transition-colors cursor-pointer ${
                    isActive ? 'text-[#f5f5f5] font-medium' : 'hover:text-[#f5f5f5]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Theme Switcher Toggle (Compact) */}
          <ThemeSwitcher variant="compact" />

          {/* Get in Touch Button (Triggers Centered Contact Modal) */}
          <button
            onClick={onOpenContactModal}
            className="hidden sm:inline-flex text-xs font-medium text-[#f5f5f5] bg-white/[0.08] hover:bg-white/[0.16] px-3.5 py-1.5 rounded-full border border-white/[0.1] transition-all cursor-pointer shadow-sm"
          >
            Get in Touch
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-1 text-[#888888] hover:text-[#f5f5f5] transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 p-4 rounded-2xl bg-[#111111]/95 backdrop-blur-2xl border border-white/[0.1] sm:hidden shadow-2xl animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3 text-left">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className="text-sm text-[#888888] hover:text-[#f5f5f5] py-2 px-2 rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Theme Switcher */}
            <div className="pt-2 border-t border-white/[0.08]">
              <ThemeSwitcher variant="expanded" />
            </div>

            <div className="pt-2 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContactModal();
                }}
                className="w-full text-center py-2.5 rounded-xl bg-white text-[#050505] text-xs font-semibold cursor-pointer"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
