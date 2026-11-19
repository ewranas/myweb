import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface SparkRipple {
  id: number;
  x: number;
  y: number;
  colorOverride?: 'red' | 'blue';
}

export const AtmosphericEffects: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ripples, setRipples] = useState<SparkRipple[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Smooth top scroll-progress hairline
  useEffect(() => {
    let rafId: number | null = null;
    const updateScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(1, Math.max(0, scrollTop / maxScroll)));
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Electric ripple feedback when clicking/tapping background or moon
  useEffect(() => {
    if (reducedMotion) return;
    const handleStrikeRipple = (e: Event) => {
      const detail = (e as CustomEvent<{ x?: number; y?: number; colorOverride?: 'red' | 'blue' }>).detail;
      if (!detail || typeof detail.x !== 'number' || typeof detail.y !== 'number') return;
      const id = Date.now() + Math.random();
      setRipples((prev) => [
        ...prev.slice(-3),
        { id, x: detail.x!, y: detail.y!, colorOverride: detail.colorOverride },
      ]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    };
    window.addEventListener('trigger-lightning', handleStrikeRipple);
    return () => window.removeEventListener('trigger-lightning', handleStrikeRipple);
  }, [reducedMotion]);

  // Lightweight floating ambient embers + constellation links + shooting stars canvas
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const particleCount = isMobile ? 14 : 28;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulse: number;
      isAccent: boolean;
    }

    interface Meteor {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      alpha: number;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -(Math.random() * 0.36 + 0.12),
      size: Math.random() * 1.7 + 0.7,
      alpha: Math.random() * 0.4 + 0.14,
      pulse: Math.random() * Math.PI * 2,
      isAccent: Math.random() > 0.35,
    }));

    const meteors: Meteor[] = [];
    let nextMeteorFrame = 90;
    let frameCount = 0;

    let animId = 0;
    const accentRgb = theme === 'midnight-blue' ? '56, 189, 248' : '255, 77, 109';
    const meteorCoreRgb = theme === 'midnight-blue' ? '186, 230, 253' : '254, 215, 170';

    const spawnMeteor = () => {
      const fromRight = Math.random() > 0.4;
      const startX = fromRight ? width * (0.45 + Math.random() * 0.5) : width * (0.05 + Math.random() * 0.45);
      const startY = Math.random() * height * 0.32;
      const speed = isMobile ? 7.5 : 10.5;
      const angle = fromRight ? Math.PI * 0.78 : Math.PI * 0.22;
      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: isMobile ? 75 : 115,
        alpha: 0.9,
        life: 0,
        maxLife: 38,
      });
    };

    const render = () => {
      if (document.hidden) {
        animId = window.requestAnimationFrame(render);
        return;
      }

      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // Update & draw ambient floating embers
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.026;

        if (p.y < -12) {
          p.y = height + 12;
          p.x = Math.random() * width;
        }
        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;

        const flicker = 0.65 + 0.35 * Math.sin(p.pulse);
        const currentAlpha = p.alpha * flicker;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isAccent
          ? `rgba(${accentRgb}, ${currentAlpha})`
          : `rgba(255, 255, 255, ${currentAlpha * 0.65})`;
        ctx.fill();
      }

      // Subtle constellation micro-filaments on desktop
      if (!isMobile) {
        const maxDist = 92;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distSq = dx * dx + dy * dy;
            if (distSq < maxDist * maxDist) {
              const dist = Math.sqrt(distSq);
              const lineAlpha = (1 - dist / maxDist) * 0.085;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(${accentRgb}, ${lineAlpha})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }
      }

      // Spawn periodic shooting star / meteor streak
      if (frameCount >= nextMeteorFrame) {
        spawnMeteor();
        nextMeteorFrame = frameCount + Math.floor(Math.random() * 220) + 190;
      }

      // Draw meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life++;

        const progress = m.life / m.maxLife;
        const fade = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
        const norm = Math.hypot(m.vx, m.vy) || 1;
        const tailX = m.x - (m.vx / norm) * m.length;
        const tailY = m.y - (m.vy / norm) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * fade})`);
        grad.addColorStop(0.28, `rgba(${meteorCoreRgb}, ${0.55 * fade})`);
        grad.addColorStop(0.65, `rgba(${accentRgb}, ${0.22 * fade})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.7;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * fade})`;
        ctx.fill();

        if (m.life >= m.maxLife) {
          meteors.splice(i, 1);
        }
      }

      animId = window.requestAnimationFrame(render);
    };

    animId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion, theme]);

  return (
    <>
      {/* Scroll Progress Hairline */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full transition-[width] duration-75 ease-out"
          style={{
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
            boxShadow: '0 0 10px var(--accent-glow)',
          }}
        />
      </div>

      {/* Floating Ambient Sparks, Constellation Links & Shooting Stars Canvas */}
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-[14] pointer-events-none"
          style={{ mixBlendMode: 'screen' }}
          aria-hidden="true"
        />
      )}

      {/* Subtle Ambient Breathing Nebula Glows */}
      <div
        className="fixed inset-0 z-[13] pointer-events-none overflow-hidden"
        style={{ mixBlendMode: 'screen' }}
        aria-hidden="true"
      >
        <div
          className="absolute -top-36 -right-36 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full blur-[130px] opacity-[0.12] animate-ambient-breathe"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        />
        <div
          className="absolute -bottom-44 -left-40 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full blur-[140px] opacity-[0.1] animate-ambient-breathe"
          style={{
            backgroundColor: 'var(--accent-secondary)',
            animationDelay: '3.5s',
          }}
        />
      </div>

      {/* Subtle Cinematic Edge Vignette */}
      <div
        className="fixed inset-0 z-[12] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 62%, rgba(0, 0, 0, 0.42) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Background / Moon Click Electric Pulse Ripples */}
      {ripples.map((r) => {
        const ringColor =
          r.colorOverride === 'blue'
            ? '#38bdf8'
            : r.colorOverride === 'red'
            ? '#ff4d6d'
            : 'var(--accent-secondary)';
        const ringGlow =
          r.colorOverride === 'blue'
            ? 'rgba(56, 189, 248, 0.55)'
            : r.colorOverride === 'red'
            ? 'rgba(225, 29, 72, 0.55)'
            : 'var(--accent-glow)';

        return (
          <span
            key={r.id}
            className="fixed z-[16] pointer-events-none rounded-full animate-electric-ripple"
            style={{
              left: r.x,
              top: r.y,
              border: `1.5px solid ${ringColor}`,
              boxShadow: `0 0 22px ${ringGlow}`,
            }}
            aria-hidden="true"
          />
        );
      })}
    </>
  );
};
