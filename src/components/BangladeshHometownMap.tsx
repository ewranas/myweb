import React, { useState } from 'react';
import { MapPin, Navigation, School, Compass, Sparkles } from 'lucide-react';

interface DivisionSpot {
  id: string;
  name: string;
  bengaliName: string;
  x: number;
  y: number;
  isHome?: boolean;
  isCollege?: boolean;
  subtext?: string;
  detail?: string;
}

export const BangladeshHometownMap: React.FC = () => {
  const [activeSpot, setActiveSpot] = useState<string>('natore');

  const locations: DivisionSpot[] = [
    {
      id: 'natore',
      name: 'Natore',
      bengaliName: 'নাটোর',
      x: 185,
      y: 235,
      isHome: true,
      subtext: 'Hometown & Roots',
      detail: 'My birthplace and home. 24.41° N, 88.98° E in North Bengal.',
    },
    {
      id: 'rajshahi',
      name: 'Rajshahi',
      bengaliName: 'রাজশাহী',
      x: 138,
      y: 242,
      isCollege: true,
      subtext: 'College City · Class 11',
      detail: 'Shahid AHM Kamaruzzaman College (~45 km daily educational commute).',
    },
    {
      id: 'dhaka',
      name: 'Dhaka',
      bengaliName: 'ঢাকা',
      x: 295,
      y: 310,
      subtext: 'Capital City',
      detail: 'Capital & tech epicenter of Bangladesh (~190 km southeast).',
    },
    {
      id: 'rangpur',
      name: 'Rangpur',
      bengaliName: 'রংপুর',
      x: 195,
      y: 115,
      subtext: 'North Division',
    },
    {
      id: 'sylhet',
      name: 'Sylhet',
      bengaliName: 'সিলেট',
      x: 420,
      y: 180,
      subtext: 'Tea Valley',
    },
    {
      id: 'chittagong',
      name: 'Chattogram',
      bengaliName: 'চট্টগ্রাম',
      x: 405,
      y: 430,
      subtext: 'Port City',
    },
    {
      id: 'khulna',
      name: 'Khulna',
      bengaliName: 'খুলনা',
      x: 200,
      y: 425,
      subtext: 'Sundarbans Gateway',
    },
    {
      id: 'barishal',
      name: 'Barishal',
      bengaliName: 'বরিশাল',
      x: 285,
      y: 440,
      subtext: 'Riverine Delta',
    },
  ];

  const activeSpotData = locations.find((l) => l.id === activeSpot) || locations[0];

  return (
    <div className="w-full my-6 rounded-3xl bg-gradient-to-b from-[#0b0e13] via-[#07090d] to-[#040507] border border-white/[0.12] p-4 sm:p-6 shadow-[0_15px_45px_rgba(0,0,0,0.8)] relative overflow-hidden text-left group/card transition-all duration-300">
      
      {/* Ambient background glows */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-500/[0.07] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-rose-500/[0.05] rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative fine map grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <MapPin className="w-4 h-4 animate-bounce-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-400 font-bold">
                Hometown · জন্মভূমি
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Coordinates
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2 mt-0.5">
              <span>Natore, Rajshahi, Bangladesh</span>
            </h3>
          </div>
        </div>

        {/* Minimal GPS HUD readout */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#888888] px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          <Navigation className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span className="text-white font-medium">24°24&apos;N</span>
          <span className="text-white/30">&bull;</span>
          <span className="text-white font-medium">88°59&apos;E</span>
        </div>
      </div>

      {/* Centered Map Canvas */}
      <div className="relative w-full max-w-[460px] mx-auto aspect-[500/580] bg-[#05070a]/90 border border-white/[0.08] rounded-2xl p-2 sm:p-4 flex items-center justify-center overflow-hidden shadow-2xl">
        
        {/* Radar ambient light centered on Natore */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_37%_40%,rgba(16,185,129,0.18),transparent_55%)] pointer-events-none" />

        <svg
          viewBox="0 0 500 580"
          className="w-full h-full filter drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] select-none"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="bgCountryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#141c26" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#0f1620" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#0b1017" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="rajshahiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#047857" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#065f46" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>

            <radialGradient id="natoreHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>

            <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Coordinate Lat/Long Grid lines */}
          <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="0.8" strokeDasharray="3 3">
            <line x1="40" y1="90" x2="460" y2="90" />
            <line x1="40" y1="180" x2="460" y2="180" />
            <line x1="40" y1="270" x2="460" y2="270" />
            <line x1="40" y1="360" x2="460" y2="360" />
            <line x1="40" y1="450" x2="460" y2="450" />
            <line x1="90" y1="40" x2="90" y2="550" />
            <line x1="180" y1="40" x2="180" y2="550" />
            <line x1="270" y1="40" x2="270" y2="550" />
            <line x1="360" y1="40" x2="360" y2="550" />
          </g>

          {/* Cartographic Edge Ticks */}
          <g fill="#64748b" fontSize="8" fontFamily="monospace" opacity="0.45">
            <text x="48" y="94">26°N</text>
            <text x="48" y="184">25°N</text>
            <text x="48" y="274">24°N</text>
            <text x="48" y="364">23°N</text>
            <text x="48" y="454">22°N</text>
            <text x="175" y="565">89°E</text>
            <text x="265" y="565">90°E</text>
            <text x="355" y="565">91°E</text>
          </g>

          {/* Geographic Outline of Bangladesh */}
          <path
            d="
              M 195,30
              L 225,50 L 235,80 L 255,100 L 280,105 L 320,115 L 350,110 L 390,120 L 440,150 
              L 470,180 L 450,210 L 420,230 L 380,240 L 375,280 L 390,320 L 415,350 L 430,400 
              L 440,460 L 445,510 L 430,545 L 410,540 L 400,500 L 385,460 L 360,430 L 330,410 
              L 320,440 L 290,470 L 260,490 L 240,480 L 210,485 L 180,480 L 160,450 L 155,410 
              L 165,370 L 150,340 L 140,300 L 115,260 L 110,210 L 125,170 L 140,140 L 165,95 
              L 185,55 Z
            "
            fill="url(#bgCountryGrad)"
            stroke="#ffffff"
            strokeOpacity="0.28"
            strokeWidth="1.6"
          />

          {/* Glowing Shadow under Border */}
          <path
            d="
              M 195,30
              L 225,50 L 235,80 L 255,100 L 280,105 L 320,115 L 350,110 L 390,120 L 440,150 
              L 470,180 L 450,210 L 420,230 L 380,240 L 375,280 L 390,320 L 415,350 L 430,400 
              L 440,460 L 445,510 L 430,545 L 410,540 L 400,500 L 385,460 L 360,430 L 330,410 
              L 320,440 L 290,470 L 260,490 L 240,480 L 210,485 L 180,480 L 160,450 L 155,410 
              L 165,370 L 150,340 L 140,300 L 115,260 L 110,210 L 125,170 L 140,140 L 165,95 
              L 185,55 Z
            "
            fill="none"
            stroke="#10b981"
            strokeOpacity="0.2"
            strokeWidth="3.5"
            filter="url(#glowFilter)"
          />

          {/* Internal Division Boundaries (Subtle dashed divisions) */}
          <g stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.8" strokeDasharray="2 3" fill="none">
            {/* Rangpur division border */}
            <path d="M 165,150 L 245,150 L 280,105" />
            {/* Sylhet division border */}
            <path d="M 320,115 L 350,200 L 380,240" />
            {/* Dhaka division border */}
            <path d="M 245,150 L 245,210 L 295,310 L 375,280" />
            {/* Khulna division border */}
            <path d="M 145,280 L 190,285 L 210,340 L 240,480" />
            {/* Barishal division border */}
            <path d="M 210,340 L 295,310 L 330,410 L 290,470" />
            {/* Chattogram division border */}
            <path d="M 295,310 L 375,280 L 415,350" />
          </g>

          {/* Highlighted Rajshahi Division Polygon (Where Natore is centered) */}
          <path
            d="
              M 115,260 
              L 125,170 
              L 165,150 
              L 215,175 
              L 245,210 
              L 230,265 
              L 190,285 
              L 145,280 
              Z
            "
            fill="url(#rajshahiGrad)"
            stroke="#10b981"
            strokeWidth="1.8"
            strokeDasharray="4 2"
          />

          {/* Animated Rivers with Real-Time Waterflow Streams */}
          <g stroke="#38bdf8" strokeWidth="1.6" fill="none">
            {/* Jamuna River Flow */}
            <path
              d="M 235,80 Q 240,150 245,210 Q 255,270 295,310"
              strokeDasharray="5 4"
              strokeOpacity="0.7"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="3s" repeatCount="indefinite" />
            </path>

            {/* Padma River Flow from Rajshahi past Natore to Bay of Bengal */}
            <path
              d="M 110,245 Q 160,265 210,280 Q 260,295 295,310 Q 330,350 320,440"
              strokeDasharray="6 4"
              strokeOpacity="0.75"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2.8s" repeatCount="indefinite" />
            </path>

            {/* River flow glow */}
            <path
              d="M 110,245 Q 160,265 210,280 Q 260,295 295,310 Q 330,350 320,440"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeOpacity="0.18"
              filter="url(#glowFilter)"
            />
          </g>

          {/* Animated Commute Route: Natore (185, 235) <-> Rajshahi (138, 242) */}
          <g>
            {/* Laser Line */}
            <line
              x1="185"
              y1="235"
              x2="138"
              y2="242"
              stroke="url(#laserGrad)"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              strokeOpacity="0.9"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="1.2s" repeatCount="indefinite" />
            </line>

            {/* Laser Aura Glow */}
            <line
              x1="185"
              y1="235"
              x2="138"
              y2="242"
              stroke="#f43f5e"
              strokeWidth="5"
              strokeOpacity="0.25"
              filter="url(#glowFilter)"
            />

            {/* Moving Commute Bead (Photon traveling between Natore and Rajshahi) */}
            <circle r="3.2" fill="#ffffff" filter="url(#glowFilter)">
              <animate attributeName="cx" values="185;138;185" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="cy" values="235;242;235" dur="2.8s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Region Titles */}
          <text
            x="142"
            y="190"
            fill="#34d399"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="1"
            opacity="0.9"
          >
            RAJSHAHI DIV.
          </text>

          <text
            x="290"
            y="270"
            fill="#94a3b8"
            fontSize="9"
            fontFamily="monospace"
            opacity="0.5"
          >
            DHAKA
          </text>

          {/* Ocean Label & Animated Wave Lines */}
          <g>
            <text
              x="240"
              y="535"
              fill="#38bdf8"
              fontSize="10.5"
              fontFamily="monospace"
              letterSpacing="3"
              opacity="0.45"
              textAnchor="middle"
            >
              BAY OF BENGAL · বঙ্গোপসাগর
            </text>
            <path
              d="M 190,545 Q 215,542 240,545 T 290,545"
              stroke="#38bdf8"
              strokeWidth="1"
              strokeOpacity="0.25"
              fill="none"
              strokeDasharray="3 3"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="24" dur="4s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Minimal Cybernetic Compass Rose (Top-Right) */}
          <g transform="translate(425, 60)" className="pointer-events-none">
            <circle cx="0" cy="0" r="16" fill="#0b1017" fillOpacity="0.8" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
            <circle cx="0" cy="0" r="12" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
            {/* North pointer needle */}
            <path d="M 0,-14 L 3,0 L -3,0 Z" fill="var(--accent-primary, #f43f5e)" />
            <path d="M 0,14 L 3,0 L -3,0 Z" fill="#64748b" opacity="0.6" />
            <text x="0" y="-17" fill="var(--accent-primary, #f43f5e)" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              N
            </text>
          </g>

          {/* Division Locations */}
          {locations.map((loc) => {
            const isNatore = loc.id === 'natore';
            const isRajshahi = loc.id === 'rajshahi';
            const isSelected = activeSpot === loc.id;

            return (
              <g
                key={loc.id}
                className="cursor-pointer transition-transform duration-300"
                onClick={() => setActiveSpot(loc.id)}
              >
                {/* Natore Concentric Multi-Ring Radar Wave Pulsing */}
                {isNatore && (
                  <>
                    {/* Expanding Outer Echo Ring 1 */}
                    <circle cx={loc.x} cy={loc.y} r="36" fill="url(#natoreHalo)">
                      <animate attributeName="r" values="8;44;8" dur="3.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0.05;0.8" dur="3.6s" repeatCount="indefinite" />
                    </circle>

                    {/* Expanding Wave Ring 2 */}
                    <circle cx={loc.x} cy={loc.y} r="22" stroke="#10b981" strokeWidth="1.2" fill="none">
                      <animate attributeName="r" values="6;26;6" dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.9;0.1;0.9" dur="2.4s" repeatCount="indefinite" />
                    </circle>

                    {/* Fast Pulsing Target Reticle Ring */}
                    <circle cx={loc.x} cy={loc.y} r="11" stroke="#34d399" strokeWidth="1.4" strokeDasharray="3 3" fill="none">
                      <animateTransform attributeName="transform" type="rotate" from={`0 ${loc.x} ${loc.y}`} to={`360 ${loc.x} ${loc.y}`} dur="8s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {/* Spot Dot */}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r={isNatore ? 6.5 : isRajshahi ? 5 : isSelected ? 4.5 : 3.5}
                  fill={isNatore ? '#10b981' : isRajshahi ? '#f43f5e' : isSelected ? '#38bdf8' : '#64748b'}
                  stroke="#ffffff"
                  strokeWidth={isNatore || isRajshahi || isSelected ? 2 : 1}
                  filter={isNatore ? 'url(#strongGlow)' : undefined}
                />

                {/* Center Core Flash for Natore */}
                {isNatore && (
                  <circle cx={loc.x} cy={loc.y} r="2.5" fill="#ffffff" />
                )}

                {/* City Label */}
                <text
                  x={loc.x + (isNatore ? 12 : 8)}
                  y={loc.y + 4}
                  fill={isNatore ? '#34d399' : isRajshahi ? '#fda4af' : isSelected ? '#38bdf8' : '#cbd5e1'}
                  fontSize={isNatore ? '12' : isRajshahi ? '10.5' : '9.5'}
                  fontWeight={isNatore ? '800' : isRajshahi ? '700' : '500'}
                  fontFamily="sans-serif"
                >
                  {loc.name} {isNatore ? '★' : ''}
                </text>
              </g>
            );
          })}

          {/* High-Tech Holographic Callout Badge Pinned on Natore */}
          <g transform="translate(195, 178)" className="pointer-events-none">
            {/* Hologram connector stem */}
            <line x1="-10" y1="57" x2="0" y2="42" stroke="#10b981" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.8" />
            <circle cx="-10" cy="57" r="2" fill="#10b981" />

            {/* Badge Container */}
            <rect
              x="0"
              y="0"
              width="142"
              height="44"
              rx="8"
              fill="#06090d"
              fillOpacity="0.96"
              stroke="#10b981"
              strokeWidth="1.4"
              filter="url(#glowFilter)"
            />
            
            {/* Header Badge Row */}
            <circle cx="12" cy="14" r="3" fill="#10b981" />
            <text x="20" y="17" fill="#10b981" fontSize="9.5" fontFamily="monospace" fontWeight="800" letterSpacing="0.5">
              NATORE (নাটোর)
            </text>

            {/* Subtitle */}
            <text x="12" y="28" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif" fontWeight="600">
              Hometown · Roots & Birthplace
            </text>
            <text x="12" y="38" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
              24.41° N · 88.98° E (North Bengal)
            </text>
          </g>

          {/* Secondary Badge for College in Rajshahi */}
          <g transform="translate(60, 260)" className="pointer-events-none">
            <line x1="78" y1="-18" x2="65" y2="-5" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
            <rect
              x="0"
              y="0"
              width="128"
              height="30"
              rx="6"
              fill="#06090d"
              fillOpacity="0.94"
              stroke="#f43f5e"
              strokeWidth="1"
            />
            <text x="8" y="13" fill="#fda4af" fontSize="8" fontFamily="monospace" fontWeight="bold">
              RAJSHAHI COLLEGE
            </text>
            <text x="8" y="23" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">
              Shahid AHM Kamaruzzaman
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Interactive Location Inspector Bar */}
      <div className="relative z-10 mt-3 pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white">
            {activeSpotData.name} ({activeSpotData.bengaliName}):
          </span>
          <span className="text-[#aaaaaa] text-xs">
            {activeSpotData.detail || activeSpotData.subtext}
          </span>
        </div>

        {/* Quick Location Pills */}
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <span className="text-white/40 uppercase hidden sm:inline-block">View:</span>
          {locations.slice(0, 3).map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveSpot(loc.id)}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeSpot === loc.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-sm'
                  : 'bg-white/[0.04] text-[#888888] hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
