import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface LightningBoltConfig {
  id: string;
  viewBox: string;
  style: React.CSSProperties;
  cloudGlowCenter: string;
  mainBoltPath: string;
  branchPaths: string[];
}

const BOLT_CONFIGS: LightningBoltConfig[] = [
  {
    id: 'strike-right-sky',
    viewBox: '0 0 500 500',
    style: { top: '0%', right: '4%', width: 'min(420px, 86vw)', height: 'min(500px, 68vh)' },
    cloudGlowCenter: '78% 18%',
    mainBoltPath:
      'M 250,5 L 265,45 L 235,95 L 275,150 L 245,210 L 290,285 L 260,360 L 285,420 L 270,490',
    branchPaths: [
      'M 235,95 L 180,140 L 195,190 L 150,230',
      'M 275,150 L 335,195 L 320,245 L 360,295',
      'M 260,360 L 215,400 L 225,445',
    ],
  },
  {
    id: 'strike-left-flank',
    viewBox: '0 0 500 520',
    style: { top: '0%', left: '3%', width: 'min(430px, 86vw)', height: 'min(520px, 70vh)' },
    cloudGlowCenter: '22% 18%',
    mainBoltPath:
      'M 240,10 L 225,55 L 260,110 L 215,175 L 250,240 L 205,310 L 235,380 L 195,450 L 210,505',
    branchPaths: [
      'M 260,110 L 320,150 L 305,200',
      'M 215,175 L 150,215 L 165,270 L 120,320',
      'M 205,310 L 265,345 L 255,390',
    ],
  },
  {
    id: 'strike-cloud-horizon',
    viewBox: '0 0 600 350',
    style: { top: '4%', right: '8%', width: 'min(540px, 92vw)', height: 'min(340px, 46vh)' },
    cloudGlowCenter: '55% 18%',
    mainBoltPath:
      'M 580,20 L 490,45 L 430,25 L 370,75 L 310,50 L 250,110 L 190,85 L 130,140 L 80,120',
    branchPaths: [
      'M 430,25 L 415,80 L 440,135',
      'M 310,50 L 335,115 L 305,165',
      'M 190,85 L 210,145 L 175,190',
    ],
  },
  {
    id: 'strike-mid-diagonal',
    viewBox: '0 0 480 480',
    style: { top: '18%', left: '16%', width: 'min(420px, 85vw)', height: 'min(460px, 60vh)' },
    cloudGlowCenter: '44% 38%',
    mainBoltPath:
      'M 90,10 L 145,75 L 115,125 L 190,195 L 160,245 L 245,320 L 220,375 L 300,455',
    branchPaths: [
      'M 145,75 L 215,95 L 235,140',
      'M 190,195 L 130,240 L 140,295',
      'M 245,320 L 315,340 L 335,385',
    ],
  },
  {
    id: 'strike-lower-arc',
    viewBox: '0 0 520 420',
    style: { bottom: '2%', right: '6%', width: 'min(460px, 88vw)', height: 'min(380px, 52vh)' },
    cloudGlowCenter: '68% 68%',
    mainBoltPath:
      'M 420,15 L 365,80 L 395,120 L 315,190 L 340,235 L 250,305 L 270,350 L 195,405',
    branchPaths: [
      'M 365,80 L 295,105 L 280,150',
      'M 315,190 L 385,220 L 370,265',
    ],
  },
];

export const AtmosphericLightning: React.FC = () => {
  const { theme } = useTheme();
  const [activeBoltIndex, setActiveBoltIndex] = useState<number | null>(null);
  const [flashPhase, setFlashPhase] = useState<'idle' | 'pre' | 'strike' | 'restrike' | 'fade'>('idle');
  const [cloudGlowOpacity, setCloudGlowOpacity] = useState(0);
  const [strikeColorOverride, setStrikeColorOverride] = useState<'red' | 'blue' | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isExecutingRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const clearStrikeTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  const dischargeLightning = useCallback(
    (forcedIndex?: number, colorOverride?: 'red' | 'blue' | null) => {
      if (reducedMotion || isExecutingRef.current) return;
      isExecutingRef.current = true;
      clearStrikeTimers();

      setStrikeColorOverride(colorOverride ?? null);

      const chosenIndex =
        forcedIndex !== undefined ? forcedIndex : Math.floor(Math.random() * BOLT_CONFIGS.length);
      setActiveBoltIndex(chosenIndex);

      setFlashPhase('pre');
      setCloudGlowOpacity(0.32);

      timersRef.current.push(
        setTimeout(() => {
          setFlashPhase('idle');
          setCloudGlowOpacity(0.1);
        }, 45),
        setTimeout(() => {
          setFlashPhase('strike');
          setCloudGlowOpacity(0.62);
        }, 85),
        setTimeout(() => {
          setFlashPhase('idle');
          setCloudGlowOpacity(0.18);
        }, 160),
        setTimeout(() => {
          setFlashPhase('restrike');
          setCloudGlowOpacity(0.46);
        }, 205),
        setTimeout(() => {
          setFlashPhase('fade');
          setCloudGlowOpacity(0.14);
        }, 290),
        setTimeout(() => {
          setFlashPhase('idle');
          setCloudGlowOpacity(0);
          setActiveBoltIndex(null);
          setStrikeColorOverride(null);
          isExecutingRef.current = false;
        }, 480)
      );
    },
    [reducedMotion, clearStrikeTimers]
  );

  useEffect(() => {
    if (reducedMotion) return;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextStrike = () => {
      const delay = Math.floor(Math.random() * 3500) + 4200;
      timeoutId = setTimeout(() => {
        dischargeLightning();
        scheduleNextStrike();
      }, delay);
    };

    const initialTimer = setTimeout(() => {
      dischargeLightning(0);
      scheduleNextStrike();
    }, 850);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timeoutId);
      clearStrikeTimers();
      isExecutingRef.current = false;
    };
  }, [dischargeLightning, reducedMotion, clearStrikeTimers]);

  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const detail = (e as CustomEvent<{ colorOverride?: 'red' | 'blue' }>).detail;
      if (isExecutingRef.current) {
        clearStrikeTimers();
        isExecutingRef.current = false;
      }
      dischargeLightning(undefined, detail?.colorOverride ?? null);
    };
    window.addEventListener('trigger-lightning', handleTrigger);
    return () => window.removeEventListener('trigger-lightning', handleTrigger);
  }, [dischargeLightning, clearStrikeTimers]);

  if (reducedMotion) return null;

  const activeConfig = activeBoltIndex !== null ? BOLT_CONFIGS[activeBoltIndex] : null;
  const boltOpacity =
    flashPhase === 'pre'
      ? 0.45
      : flashPhase === 'strike'
      ? 0.88
      : flashPhase === 'restrike'
      ? 0.68
      : flashPhase === 'fade'
      ? 0.25
      : 0;

  const isBlue = strikeColorOverride ? strikeColorOverride === 'blue' : theme === 'midnight-blue';
  const strokePrimary = isBlue ? '#3b82f6' : '#e11d48';
  const strokeBranch = isBlue ? '#38bdf8' : '#ff4d6d';
  const glowPrimary = isBlue ? 'rgba(59, 130, 246, 0.9)' : 'rgba(225, 29, 72, 0.9)';
  const glowMid = isBlue ? 'rgba(59, 130, 246, 0.25)' : 'rgba(225, 29, 72, 0.25)';
  const glowOuter = isBlue ? 'rgba(30, 58, 138, 0.1)' : 'rgba(136, 19, 55, 0.1)';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[15] overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    >
      {/* Sky Cloud Illumination */}
      <div
        className="fixed inset-0 transition-opacity duration-75 pointer-events-none"
        style={{
          opacity: cloudGlowOpacity,
          background: activeConfig
            ? `radial-gradient(ellipse at ${activeConfig.cloudGlowCenter}, rgba(255, 255, 255, 0.22) 0%, ${glowMid} 38%, ${glowOuter} 70%, transparent 92%)`
            : 'transparent',
        }}
      />

      {/* Electric Bolt Vectors */}
      {activeConfig && (
        <div
          className="fixed pointer-events-none"
          style={{
            ...activeConfig.style,
            opacity: boltOpacity,
            transition: flashPhase === 'fade' ? 'opacity 0.22s ease-out' : 'opacity 0.03s linear',
            filter: `drop-shadow(0 0 6px rgba(255,255,255,0.85)) drop-shadow(0 0 20px ${glowPrimary})`,
          }}
        >
          <svg viewBox={activeConfig.viewBox} className="w-full h-full overflow-visible" fill="none">
            <path
              d={activeConfig.mainBoltPath}
              stroke={strokePrimary}
              strokeWidth="4.8"
              strokeLinecap="round"
              strokeLinejoin="miter"
              opacity="0.78"
            />
            <path
              d={activeConfig.mainBoltPath}
              stroke="#ffffff"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="miter"
              opacity="0.96"
            />
            {activeConfig.branchPaths.map((branchPath, idx) => (
              <React.Fragment key={idx}>
                <path
                  d={branchPath}
                  stroke={strokeBranch}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  opacity="0.75"
                />
                <path
                  d={branchPath}
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  opacity="0.75"
                />
              </React.Fragment>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
};
