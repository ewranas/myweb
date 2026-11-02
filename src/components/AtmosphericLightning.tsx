import React, { useState, useEffect, useCallback, useRef } from 'react';

interface LightningBoltConfig {
  id: string;
  viewBox: string;
  style: React.CSSProperties;
  cloudGlowCenter: string; // CSS radial center e.g. "72% 28%"
  mainBoltPath: string;
  branchPaths: string[];
}

const BOLT_CONFIGS: LightningBoltConfig[] = [
  {
    id: 'strike-moon-adjacent',
    viewBox: '0 0 500 500',
    style: { top: '0%', right: '12%', width: '420px', height: '480px' },
    cloudGlowCenter: '75% 25%',
    // Dramatic zig-zag downward bolt with 4 branches
    mainBoltPath:
      'M 250,5 L 265,45 L 235,95 L 275,150 L 245,210 L 290,285 L 260,360 L 285,420 L 270,490',
    branchPaths: [
      // Branch 1 shooting left-down
      'M 235,95 L 180,140 L 195,190 L 150,230 L 135,280',
      // Branch 2 shooting right-down
      'M 275,150 L 335,195 L 320,245 L 360,295 L 380,340',
      // Fork from lower main bolt
      'M 290,285 L 340,325 L 355,380',
      // Micro branch
      'M 180,140 L 140,165 L 125,195',
    ],
  },
  {
    id: 'strike-cloud-crawler-horizontal',
    viewBox: '0 0 600 350',
    style: { top: '2%', right: '2%', width: '560px', height: '340px' },
    cloudGlowCenter: '60% 20%',
    // Jagged cloud-to-cloud crawler weaving across the upper clouds
    mainBoltPath:
      'M 580,20 L 490,45 L 430,25 L 370,75 L 310,50 L 250,110 L 190,85 L 130,140 L 80,120 L 20,175',
    branchPaths: [
      // Downward forks dropping out of clouds
      'M 430,25 L 415,80 L 440,135 L 420,180',
      'M 310,50 L 335,115 L 305,165 L 320,220',
      'M 190,85 L 165,150 L 180,205 L 155,260',
      // Upward crawl wisp
      'M 370,75 L 390,30 L 420,15',
    ],
  },
  {
    id: 'strike-sharp-center',
    viewBox: '0 0 450 480',
    style: { top: '1%', right: '28%', width: '380px', height: '440px' },
    cloudGlowCenter: '50% 22%',
    // High-voltage sharp zig-zag fork
    mainBoltPath:
      'M 220,10 L 240,65 L 210,115 L 265,175 L 225,235 L 270,305 L 235,375 L 255,445',
    branchPaths: [
      // Left sharp fork
      'M 210,115 L 155,160 L 170,210 L 120,255 L 105,305',
      // Right fork
      'M 265,175 L 315,225 L 300,280 L 335,335',
      // Deep downward needle
      'M 225,235 L 190,290 L 205,345 L 175,395',
    ],
  },
];

export const AtmosphericLightning: React.FC = () => {
  const [activeBoltIndex, setActiveBoltIndex] = useState<number | null>(null);
  const [flashPhase, setFlashPhase] = useState<'idle' | 'pre' | 'strike' | 'restrike' | 'fade'>('idle');
  const [cloudGlowOpacity, setCloudGlowOpacity] = useState(0);
  const isExecutingRef = useRef(false);

  // Trigger one multi-strobe lightning discharge sequence
  const dischargeLightning = useCallback((forcedIndex?: number) => {
    if (isExecutingRef.current) return;
    isExecutingRef.current = true;

    const chosenIndex =
      forcedIndex !== undefined
        ? forcedIndex
        : Math.floor(Math.random() * BOLT_CONFIGS.length);

    setActiveBoltIndex(chosenIndex);

    // Stroboscopic real-lightning sequence:
    // 1. Initial leader flash (t=0ms)
    setFlashPhase('pre');
    setCloudGlowOpacity(0.55);

    // 2. Dip (t=45ms)
    const t1 = setTimeout(() => {
      setFlashPhase('idle');
      setCloudGlowOpacity(0.15);
    }, 45);

    // 3. Main Return Stroke (t=80ms) - peak intensity & electric corona
    const t2 = setTimeout(() => {
      setFlashPhase('strike');
      setCloudGlowOpacity(0.95);
    }, 80);

    // 4. Secondary flicker dip (t=160ms)
    const t3 = setTimeout(() => {
      setFlashPhase('idle');
      setCloudGlowOpacity(0.3);
    }, 160);

    // 5. Re-strike pulse (t=200ms)
    const t4 = setTimeout(() => {
      setFlashPhase('restrike');
      setCloudGlowOpacity(0.75);
    }, 200);

    // 6. Dissipation / Afterglow fade (t=290ms)
    const t5 = setTimeout(() => {
      setFlashPhase('fade');
      setCloudGlowOpacity(0.25);
    }, 290);

    // 7. Complete return to darkness (t=460ms)
    const t6 = setTimeout(() => {
      setFlashPhase('idle');
      setCloudGlowOpacity(0);
      setActiveBoltIndex(null);
      isExecutingRef.current = false;
    }, 480);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      isExecutingRef.current = false;
    };
  }, []);

  // Periodic natural random discharge (every 4.5 to 8.5 seconds)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNextStrike = () => {
      // Random delay between 4500ms and 8000ms
      const delay = Math.floor(Math.random() * 3500) + 4500;
      timeoutId = setTimeout(() => {
        dischargeLightning();
        scheduleNextStrike();
      }, delay);
    };

    // Initial first strike after 2.2 seconds for immediate feedback
    const initialTimer = setTimeout(() => {
      dischargeLightning(0);
      scheduleNextStrike();
    }, 2200);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timeoutId);
    };
  }, [dischargeLightning]);

  // Support interactive click/tap trigger on the sky or clouds
  useEffect(() => {
    const handleTrigger = () => {
      dischargeLightning();
    };
    window.addEventListener('trigger-lightning', handleTrigger);
    return () => {
      window.removeEventListener('trigger-lightning', handleTrigger);
    };
  }, [dischargeLightning]);

  const activeConfig = activeBoltIndex !== null ? BOLT_CONFIGS[activeBoltIndex] : null;

  // Bolt visibility & intensity based on flash phase
  const getBoltOpacity = () => {
    switch (flashPhase) {
      case 'pre':
        return 0.65;
      case 'strike':
        return 1;
      case 'restrike':
        return 0.85;
      case 'fade':
        return 0.35;
      default:
        return 0;
    }
  };

  const currentBoltOpacity = getBoltOpacity();

  return (
    <div
      className="absolute inset-0 pointer-events-none z-15 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Global Cloud & Sky Ambient Flash (illuminates cloud canopy and city horizon) */}
      <div
        className="absolute inset-0 transition-opacity duration-75 pointer-events-none"
        style={{
          opacity: cloudGlowOpacity,
          background: activeConfig
            ? `radial-gradient(ellipse at ${activeConfig.cloudGlowCenter}, rgba(255, 230, 240, 0.42) 0%, rgba(225, 29, 72, 0.28) 35%, rgba(147, 51, 234, 0.12) 65%, transparent 80%)`
            : 'transparent',
          mixBlendMode: 'screen',
        }}
      />

      {/* 2. Secondary soft diffuse sky strobe (very fast) */}
      <div
        className="absolute top-0 left-0 right-0 h-96 transition-opacity duration-100 pointer-events-none"
        style={{
          opacity: cloudGlowOpacity * 0.45,
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(251, 113, 133, 0.25) 30%, rgba(225, 29, 72, 0.08) 70%, transparent 100%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* 3. The Zig-Zag Lightning Bolt ("আঁকাবাঁকা বজ্রপাত") */}
      {activeConfig && (
        <div
          className="absolute pointer-events-none"
          style={{
            ...activeConfig.style,
            opacity: currentBoltOpacity,
            transition: flashPhase === 'fade' ? 'opacity 0.22s ease-out' : 'opacity 0.03s linear',
            filter:
              'drop-shadow(0 0 4px #ffffff) drop-shadow(0 0 10px #ff2a6d) drop-shadow(0 0 24px #e11d48) drop-shadow(0 0 45px rgba(225,29,72,0.8))',
          }}
        >
          <svg
            viewBox={activeConfig.viewBox}
            className="w-full h-full overflow-visible"
            fill="none"
          >
            <defs>
              {/* Electric White-to-Crimson Glow Gradient */}
              <linearGradient
                id={`lightningCoreGrad-${activeConfig.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="85%" stopColor="#ffb3c1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ff4d6d" stopOpacity="0.75" />
              </linearGradient>

              {/* Outer High-Voltage Corona Filter */}
              <filter id={`electricGlow-${activeConfig.id}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* A. Thick Outer Saturated Rose/Crimson Aura for Main Bolt */}
            <path
              d={activeConfig.mainBoltPath}
              stroke="#e11d48"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="miter"
              strokeMiterlimit="3"
              opacity="0.8"
            />
            {/* Intermediate Violet/Pink Plasma */}
            <path
              d={activeConfig.mainBoltPath}
              stroke="#fb7185"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="miter"
              strokeMiterlimit="3"
              opacity="0.95"
            />
            {/* White-Hot Core of Main Bolt */}
            <path
              d={activeConfig.mainBoltPath}
              stroke={`url(#lightningCoreGrad-${activeConfig.id})`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="miter"
              strokeMiterlimit="3"
              filter={`url(#electricGlow-${activeConfig.id})`}
            />

            {/* B. Branching Jagged Forks ("আঁকাবাঁকা শাখা") */}
            {activeConfig.branchPaths.map((branchPath, bIdx) => (
              <g key={bIdx} opacity={0.88}>
                {/* Branch Glow */}
                <path
                  d={branchPath}
                  stroke="#e11d48"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  strokeMiterlimit="2.5"
                  opacity="0.7"
                />
                {/* Branch White Core */}
                <path
                  d={branchPath}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  strokeMiterlimit="2.5"
                />
              </g>
            ))}

            {/* Spark Discharges at Terminal Points */}
            <circle cx="270" cy="490" r="4" fill="#ffffff" opacity="0.9" filter="drop-shadow(0 0 8px #ff2a6d)" />
          </svg>
        </div>
      )}
    </div>
  );
};
