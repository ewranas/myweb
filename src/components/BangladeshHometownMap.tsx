import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Compass, 
  Clock, 
  Navigation, 
  Sparkles, 
  Building2, 
  ExternalLink, 
  Heart, 
  Radio, 
  Globe, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface DivisionSpot {
  id: string;
  name: string;
  bengaliName: string;
  x: number;
  y: number;
  isHome?: boolean;
  isCollege?: boolean;
  distanceFromNatore?: string;
  description: string;
}

export const BangladeshHometownMap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'heritage' | 'connectivity'>('map');
  const [selectedSpot, setSelectedSpot] = useState<string>('natore');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null);

  // Live Bangladesh Standard Time (BST = UTC+6)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format in Asia/Dhaka timezone
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setCurrentTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const keyLocations: DivisionSpot[] = [
    {
      id: 'natore',
      name: 'Natore',
      bengaliName: 'নাটোর',
      x: 185,
      y: 235,
      isHome: true,
      distanceFromNatore: '0 km (Root)',
      description: 'My hometown & birth city. Renowned for Uttara Gonobhaban, Chalan Beel, and Kachagolla sweet.',
    },
    {
      id: 'rajshahi',
      name: 'Rajshahi',
      bengaliName: 'রাজশাহী',
      x: 142,
      y: 242,
      isCollege: true,
      distanceFromNatore: '~45 km',
      description: 'The Silk City and Education Hub. Home to Shahid AHM Kamaruzzaman College where I study Class 11.',
    },
    {
      id: 'dhaka',
      name: 'Dhaka',
      bengaliName: 'ঢাকা',
      x: 295,
      y: 310,
      distanceFromNatore: '~190 km',
      description: 'The vibrant capital and tech epicenter of Bangladesh.',
    },
    {
      id: 'rangpur',
      name: 'Rangpur',
      bengaliName: 'রংপুর',
      x: 195,
      y: 115,
      distanceFromNatore: '~160 km',
      description: 'Major cultural division in northern Bangladesh.',
    },
    {
      id: 'sylhet',
      name: 'Sylhet',
      bengaliName: 'সিলেট',
      x: 420,
      y: 180,
      distanceFromNatore: '~320 km',
      description: 'Land of two leaves and a bud, tea gardens, and lush highlands.',
    },
    {
      id: 'chittagong',
      name: 'Chattogram',
      bengaliName: 'চট্টগ্রাম',
      x: 405,
      y: 430,
      distanceFromNatore: '~390 km',
      description: 'Commercial capital, seaport, and coastal gateway of Bangladesh.',
    },
    {
      id: 'khulna',
      name: 'Khulna',
      bengaliName: 'খুলনা',
      x: 200,
      y: 425,
      distanceFromNatore: '~210 km',
      description: 'Gateway to the Sundarbans mangrove forest.',
    },
  ];

  const activeSpotData = keyLocations.find((loc) => loc.id === selectedSpot) || keyLocations[0];

  return (
    <div className="w-full my-8 rounded-2xl bg-gradient-to-b from-[#0f1115]/95 via-[#0a0c0f]/90 to-[#07080a] border border-white/[0.12] p-5 sm:p-7 shadow-[0_12px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden transition-all duration-300">
      
      {/* Background ambient radial glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-rose-500/[0.07] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/[0.06] rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <MapPin className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                  Hometown & Roots
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/70 font-mono">
                  জন্মভূমি
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2 mt-0.5">
                <span>Natore, Rajshahi, Bangladesh</span>
                <span className="hidden sm:inline-block text-xs font-normal text-white/40 font-mono">
                  (24.41° N, 88.98° E)
                </span>
              </h3>
            </div>
          </div>

          {/* Live BST Time & Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white/80">
              <Clock className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>BST: {currentTime || '06:00:00 PM'}</span>
              <span className="text-[10px] text-white/40">(GMT+6)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Active in Natore</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === 'map'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Map</span>
          </button>
          <button
            onClick={() => setActiveTab('heritage')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === 'heritage'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hometown Heritage</span>
          </button>
          <button
            onClick={() => setActiveTab('connectivity')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === 'connectivity'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Distance & Work</span>
          </button>
        </div>

        {/* TAB 1: INTERACTIVE BANGLADESH MAP */}
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Visual SVG Map of Bangladesh with Natore Pulse */}
            <div className="md:col-span-7 bg-[#06080a] border border-white/[0.08] rounded-xl p-3 sm:p-4 relative flex flex-col items-center justify-center overflow-hidden group">
              
              {/* Radar sweep ambient background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_40%,rgba(16,185,129,0.12),transparent_60%)]" />

              {/* Map Canvas with SVG */}
              <div className="relative w-full max-w-[380px] aspect-[500/580]">
                <svg
                  viewBox="0 0 500 580"
                  className="w-full h-full filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] select-none"
                >
                  <defs>
                    {/* Linear and radial gradients */}
                    <linearGradient id="bgCountryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#141c24" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#101720" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#0d1219" stopOpacity="0.9" />
                    </linearGradient>

                    <linearGradient id="rajshahiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#064e3b" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#047857" stopOpacity="0.85" />
                    </linearGradient>

                    <radialGradient id="natoreHalo" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                      <stop offset="60%" stopColor="#10b981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </radialGradient>

                    <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Coordinate Grid lines */}
                  <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.8" strokeDasharray="3 3">
                    <line x1="50" y1="100" x2="450" y2="100" />
                    <line x1="50" y1="200" x2="450" y2="200" />
                    <line x1="50" y1="300" x2="450" y2="300" />
                    <line x1="50" y1="400" x2="450" y2="400" />
                    <line x1="50" y1="500" x2="450" y2="500" />
                    <line x1="100" y1="50" x2="100" y2="550" />
                    <line x1="200" y1="50" x2="200" y2="550" />
                    <line x1="300" y1="50" x2="300" y2="550" />
                    <line x1="400" y1="50" x2="400" y2="550" />
                  </g>

                  {/* Geographic Outline of Bangladesh (Polygonal vector contour) */}
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
                    strokeOpacity="0.25"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />

                  {/* Highlighted Rajshahi Division Polygon (Where Natore is situated) */}
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
                    strokeDasharray={hoveredDivision === 'rajshahi' ? 'none' : '4 2'}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredDivision('rajshahi')}
                    onMouseLeave={() => setHoveredDivision(null)}
                    onClick={() => setSelectedSpot('natore')}
                  />

                  {/* Rivers: Padma & Jamuna indication */}
                  <g stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1.4" fill="none">
                    {/* Jamuna flowing down */}
                    <path d="M 235,80 Q 240,150 245,210 Q 255,270 295,310" strokeDasharray="3 3" />
                    {/* Padma flowing from Rajshahi/Natore border past Dhaka */}
                    <path d="M 110,245 Q 160,265 210,280 Q 260,295 295,310 Q 330,350 320,440" />
                  </g>

                  {/* Label for Rajshahi Division */}
                  <text
                    x="145"
                    y="195"
                    fill="#34d399"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="600"
                    opacity="0.85"
                    letterSpacing="1"
                  >
                    RAJSHAHI DIV.
                  </text>

                  {/* Label for Dhaka Division */}
                  <text
                    x="290"
                    y="275"
                    fill="#94a3b8"
                    fontSize="10"
                    fontFamily="monospace"
                    opacity="0.6"
                  >
                    DHAKA
                  </text>

                  {/* Bay of Bengal Text */}
                  <text
                    x="240"
                    y="535"
                    fill="#38bdf8"
                    fontSize="11"
                    fontFamily="monospace"
                    letterSpacing="3"
                    opacity="0.4"
                    textAnchor="middle"
                  >
                    BAY OF BENGAL
                  </text>

                  {/* Connection Line: Natore to Rajshahi (College Commute) */}
                  <line
                    x1="185"
                    y1="235"
                    x2="142"
                    y2="242"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    strokeOpacity="0.8"
                  />

                  {/* Connection Line: Natore to Dhaka */}
                  <line
                    x1="185"
                    y1="235"
                    x2="295"
                    y2="310"
                    stroke="#ffffff"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    strokeOpacity="0.25"
                  />

                  {/* Render Division spots & markers */}
                  {keyLocations.map((loc) => {
                    const isSelected = selectedSpot === loc.id;
                    const isNatore = loc.id === 'natore';
                    const isRajshahi = loc.id === 'rajshahi';

                    return (
                      <g
                        key={loc.id}
                        className="cursor-pointer transition-transform duration-200"
                        onClick={() => setSelectedSpot(loc.id)}
                      >
                        {/* Natore Special Radar Effect */}
                        {isNatore && (
                          <>
                            {/* Outer Radar Ripple Rings */}
                            <circle
                              cx={loc.x}
                              cy={loc.y}
                              r="26"
                              fill="url(#natoreHalo)"
                              className="animate-ping"
                              style={{ animationDuration: '3s' }}
                            />
                            <circle
                              cx={loc.x}
                              cy={loc.y}
                              r="16"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="1.2"
                              strokeOpacity="0.6"
                              strokeDasharray="2 2"
                            />
                            {/* Coordinate Crosshair */}
                            <line
                              x1={loc.x - 20}
                              y1={loc.y}
                              x2={loc.x + 20}
                              y2={loc.y}
                              stroke="#10b981"
                              strokeWidth="0.8"
                              strokeOpacity="0.5"
                            />
                            <line
                              x1={loc.x}
                              y1={loc.y - 20}
                              x2={loc.x}
                              y2={loc.y + 20}
                              stroke="#10b981"
                              strokeWidth="0.8"
                              strokeOpacity="0.5"
                            />
                          </>
                        )}

                        {/* Standard Marker Circle */}
                        <circle
                          cx={loc.x}
                          cy={loc.y}
                          r={isNatore ? 6.5 : isRajshahi ? 5 : isSelected ? 4.5 : 3.5}
                          fill={isNatore ? '#10b981' : isRajshahi ? '#f43f5e' : isSelected ? '#38bdf8' : '#64748b'}
                          stroke="#ffffff"
                          strokeWidth={isNatore || isRajshahi || isSelected ? 2 : 1}
                          filter={isNatore ? 'url(#glowFilter)' : undefined}
                        />

                        {/* Text Label */}
                        <text
                          x={loc.x + (isNatore ? 12 : 8)}
                          y={loc.y + 4}
                          fill={isNatore ? '#34d399' : isRajshahi ? '#fda4af' : '#cbd5e1'}
                          fontSize={isNatore ? '12' : '10'}
                          fontWeight={isNatore || isRajshahi ? '700' : '500'}
                          fontFamily="sans-serif"
                        >
                          {loc.name} {isNatore ? '★ (Hometown)' : ''}
                        </text>
                      </g>
                    );
                  })}

                  {/* Callout box for Natore pinned in SVG */}
                  <g transform="translate(195, 185)">
                    <rect
                      x="0"
                      y="0"
                      width="128"
                      height="38"
                      rx="6"
                      fill="#05080c"
                      fillOpacity="0.95"
                      stroke="#10b981"
                      strokeWidth="1"
                    />
                    <text x="8" y="16" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">
                      NATORE (নাটোর)
                    </text>
                    <text x="8" y="30" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">
                      Roots · Home · 24.41°N
                    </text>
                  </g>
                </svg>
              </div>

              {/* Bottom quick toggle chips for fast jumping */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2 pt-2 border-t border-white/[0.06] w-full">
                <span className="text-[10px] font-mono text-white/40 uppercase">Explore:</span>
                {keyLocations.slice(0, 4).map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedSpot(loc.id)}
                    className={`text-[11px] px-2 py-0.5 rounded font-mono transition-all ${
                      selectedSpot === loc.id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-white/[0.04] text-white/60 hover:text-white'
                    }`}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Detailed Location Inspector & Hometown Narrative */}
            <div className="md:col-span-5 space-y-4">
              
              {/* Selected Location Card */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Radio className="w-4 h-4 animate-pulse" />
                    </span>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-emerald-400/90 tracking-wider block">
                        Location Focus
                      </span>
                      <h4 className="text-base font-bold text-white">
                        {activeSpotData.name} ({activeSpotData.bengaliName})
                      </h4>
                    </div>
                  </div>
                  
                  {activeSpotData.isHome && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Hometown
                    </span>
                  )}
                  {activeSpotData.isCollege && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      College City
                    </span>
                  )}
                </div>

                <p className="text-xs text-white/70 leading-relaxed">
                  {activeSpotData.description}
                </p>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/50">
                  <span>Distance from Home:</span>
                  <span className="text-white font-semibold">{activeSpotData.distanceFromNatore}</span>
                </div>
              </div>

              {/* Hometown Identity Callout */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500/[0.08] to-emerald-500/[0.05] border border-white/[0.08] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
                  <span>Proud Roots of North Bengal (উত্তরবঙ্গ)</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Born and brought up in <strong className="text-white">Natore</strong>. Commuting regularly to <strong className="text-white">Rajshahi</strong> for higher secondary studies at Shahid AHM Kamaruzzaman College.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-white/80 border border-white/[0.08]">
                    🏰 Uttara Gonobhaban
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-white/80 border border-white/[0.08]">
                    🍬 Kachagolla Sweet
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-white/80 border border-white/[0.08]">
                    🌾 Chalan Beel
                  </span>
                </div>
              </div>

              {/* Direct Maps Link */}
              <a
                href="https://www.google.com/maps/place/Natore,+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-emerald-500/40 text-xs font-medium text-white transition-all group"
              >
                <span>Explore Natore on Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-emerald-400 transition-colors" />
              </a>

            </div>

          </div>
        )}

        {/* TAB 2: HOMETOWN HERITAGE & CULTURE */}
        {activeTab === 'heritage' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Card 1: Uttara Gonobhaban */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all space-y-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Uttara Gonobhaban (উত্তরা গণভবন)</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                The royal Dighapatia Palace, now the Northern Official Presidential Residence of Bangladesh. A stunning architectural marvel with grand gardens and royal clock towers.
              </p>
              <span className="inline-block text-[10px] font-mono text-emerald-400 uppercase pt-1">
                Historic Landmark · Natore
              </span>
            </div>

            {/* Card 2: Famous Natore Kachagolla */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-rose-500/40 transition-all space-y-2">
              <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Natore Kachagolla (কাঁচাগোল্লা)</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Celebrated across Bangladesh for over two centuries. Made from fresh pure milk chenna, holding official Geographical Indication (GI) status.
              </p>
              <span className="inline-block text-[10px] font-mono text-rose-400 uppercase pt-1">
                Authentic Delicacy · GI Heritage
              </span>
            </div>

            {/* Card 3: Chalan Beel */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-sky-500/40 transition-all space-y-2">
              <div className="h-8 w-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
                <Navigation className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Chalan Beel (চলন বিল)</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                The largest wetland and inland water body of Bangladesh, spanning Natore and neighboring districts. Scenic vistas, rich biodiversity, and natural waterways.
              </p>
              <span className="inline-block text-[10px] font-mono text-sky-400 uppercase pt-1">
                Natural Ecosystem · Waterways
              </span>
            </div>

          </div>
        )}

        {/* TAB 3: CONNECTIVITY & DISTANCE CALCULATOR */}
        {activeTab === 'connectivity' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Remote & Digital Connectivity</h4>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Despite being in North Bengal, Natore has optical fiber internet connectivity. Anas works, studies, and develops modern software applications smoothly for international and local collaboration.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[10px] font-mono text-white/40 block">Time Zone</span>
                  <span className="text-xs font-semibold text-white">UTC +06:00 (BST)</span>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-[10px] font-mono text-white/40 block">Work Availability</span>
                  <span className="text-xs font-semibold text-emerald-400">Remote / Global</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-sky-400" />
                <h4 className="text-sm font-bold text-white">Distances from Natore</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.02]">
                  <span className="text-white/80">To Shahid AHM Kamaruzzaman College (Rajshahi):</span>
                  <span className="font-mono text-emerald-400 font-semibold">~45 km (Daily route)</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.02]">
                  <span className="text-white/80">To Capital City (Dhaka):</span>
                  <span className="font-mono text-white font-semibold">~190 km (via Bangabandhu Bridge)</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.02]">
                  <span className="text-white/80">To Bogura City:</span>
                  <span className="font-mono text-white font-semibold">~65 km</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
