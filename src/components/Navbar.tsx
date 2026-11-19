import React, { useState, useEffect } from 'react';
import { Menu, X, Mail } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Education', href: '#education', id: 'education' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Pill */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="pointer-events-auto px-4 py-2 rounded-full bg-black/75 backdrop-blur-xl border border-white/[0.1] text-xs font-bold tracking-wide text-[#f5f5f5] hover:border-white/[0.25] transition-all whitespace-nowrap shrink-0 shadow-lg"
        >
          Anas<span style={{ color: 'var(--accent-secondary)' }}>.X</span>
        </a>

        {/* Floating Center Pill Nav */}
        <nav
          className={`pointer-events-auto hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-2xl ${
            isScrolled
              ? 'bg-black/85 border-white/[0.14]'
              : 'bg-black/60 border-white/[0.08]'
          }`}
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white text-[#050505] font-semibold shadow-sm'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Theme Switcher + Contact Trigger */}
        <div className="pointer-events-auto flex items-center gap-2 shrink-0">
          <ThemeSwitcher className="hidden sm:inline-flex" />

          <button
            type="button"
            onClick={onOpenContactModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#050505] hover:bg-white/90 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shadow-lg"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-black/75 backdrop-blur-xl border border-white/[0.12] text-[#f5f5f5] cursor-pointer shadow-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 mx-auto max-w-md rounded-2xl bg-[#0d0d10]/95 backdrop-blur-2xl border border-white/[0.12] p-5 shadow-2xl space-y-4">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`min-h-[44px] flex items-center px-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-[#aaaaaa] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <ThemeSwitcher variant="expanded" className="pt-2 border-t border-white/[0.08]" />

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContactModal();
            }}
            className="w-full min-h-[44px] py-2.5 rounded-full bg-white text-[#050505] text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
          </button>
        </div>
      )}
    </header>
  );
};
