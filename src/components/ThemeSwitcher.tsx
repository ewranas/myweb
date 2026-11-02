import React from 'react';
import { useTheme, Theme } from '../context/ThemeContext';
import { Sparkles, Moon } from 'lucide-react';

interface ThemeSwitcherProps {
  variant?: 'compact' | 'expanded';
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { theme, setTheme, toggleTheme } = useTheme();

  if (variant === 'expanded') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center justify-between text-xs text-[#888888] font-mono uppercase tracking-wider px-1">
          <span className="flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-white/70" />
            <span>Theme Aura</span>
          </span>
          <span className="text-[10px] text-white/50">
            {theme === 'dark-red' ? 'Crimson Moon' : 'Midnight Azure'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Dark Red Button */}
          <button
            type="button"
            onClick={() => setTheme('dark-red')}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left cursor-pointer ${
              theme === 'dark-red'
                ? 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_20px_rgba(225,29,72,0.25)] text-white'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-white/[0.2] text-[#888888] hover:text-[#f5f5f5]'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-rose-700 to-rose-400 shadow-[0_0_10px_#f43f5e]" />
              {theme === 'dark-red' && (
                <span className="absolute inset-[-4px] rounded-full border border-rose-400/60 animate-ping opacity-40 pointer-events-none" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold tracking-wide">Dark Red</div>
              <div className="text-[10px] text-white/40 truncate">Crimson Moon</div>
            </div>
          </button>

          {/* Midnight Blue Button */}
          <button
            type="button"
            onClick={() => setTheme('midnight-blue')}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left cursor-pointer ${
              theme === 'midnight-blue'
                ? 'bg-blue-950/40 border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.25)] text-white'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-white/[0.2] text-[#888888] hover:text-[#f5f5f5]'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-700 to-sky-400 shadow-[0_0_10px_#38bdf8]" />
              {theme === 'midnight-blue' && (
                <span className="absolute inset-[-4px] rounded-full border border-blue-400/60 animate-ping opacity-40 pointer-events-none" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold tracking-wide">Midnight Blue</div>
              <div className="text-[10px] text-white/40 truncate">Azure Starlight</div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Compact Pill for Desktop Navbar
  return (
    <div
      className={`relative inline-flex items-center p-1 rounded-full bg-black/40 border border-white/[0.12] backdrop-blur-md shadow-inner group ${className}`}
      role="group"
      aria-label="Theme switcher"
    >
      {/* Sliding Active Pill Background */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out pointer-events-none ${
          theme === 'dark-red'
            ? 'left-1 bg-gradient-to-r from-rose-950/80 to-rose-900/60 border border-rose-500/40 shadow-[0_0_12px_rgba(225,29,72,0.4)]'
            : 'left-[calc(50%+2px)] bg-gradient-to-r from-blue-950/80 to-blue-900/60 border border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.4)]'
        }`}
      />

      {/* Dark Red Toggle Button */}
      <button
        type="button"
        onClick={() => setTheme('dark-red')}
        className={`relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer select-none ${
          theme === 'dark-red'
            ? 'text-white font-semibold'
            : 'text-[#777777] hover:text-[#cccccc]'
        }`}
        title="Switch to Dark Red theme (Crimson Celestial Moon)"
        aria-pressed={theme === 'dark-red'}
      >
        <span
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            theme === 'dark-red'
              ? 'bg-[#e11d48] shadow-[0_0_8px_#ff4d6d] scale-110'
              : 'bg-[#881337] opacity-60'
          }`}
        />
        <span className="hidden md:inline tracking-wide">Dark Red</span>
      </button>

      {/* Midnight Blue Toggle Button */}
      <button
        type="button"
        onClick={() => setTheme('midnight-blue')}
        className={`relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer select-none ${
          theme === 'midnight-blue'
            ? 'text-white font-semibold'
            : 'text-[#777777] hover:text-[#cccccc]'
        }`}
        title="Switch to Midnight Blue theme (Azure Celestial Moon & Storm)"
        aria-pressed={theme === 'midnight-blue'}
      >
        <span
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            theme === 'midnight-blue'
              ? 'bg-[#3b82f6] shadow-[0_0_8px_#38bdf8] scale-110'
              : 'bg-[#1e3a8a] opacity-60'
          }`}
        />
        <span className="hidden md:inline tracking-wide">Midnight Blue</span>
      </button>
    </div>
  );
};
