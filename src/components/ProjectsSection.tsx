import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

const getProjectSublabel = (project: ProjectItem): string => {
  if (project.id === 'folafol') return 'Educational platform, 2025';
  if (project.id === 'messboi') return 'Mess & meal web app, 2025';
  if (project.id === 'my-introduction') return 'Interactive showreel, 2026';
  return `${project.badge}, 2025`;
};

const CURVE_PATHS = [
  'M 0.024,0.032 Q 0.5,-0.012 0.978,0.042 C 0.992,0.34 0.992,0.68 0.962,0.968 Q 0.5,0.942 0.014,0.985 C 0.032,0.66 0.032,0.34 0.024,0.032 Z',
  'M 0.014,0.038 Q 0.5,0.004 0.986,0.024 C 0.972,0.34 0.968,0.68 0.986,0.962 Q 0.5,0.996 0.022,0.956 C 0.034,0.65 0.03,0.35 0.014,0.038 Z',
  'M 0.022,0.026 Q 0.5,0.052 0.978,0.022 C 0.988,0.35 0.986,0.68 0.968,0.978 Q 0.5,0.95 0.018,0.974 C 0.03,0.66 0.032,0.34 0.022,0.026 Z',
];

interface ShowcaseCardProps {
  project: ProjectItem;
  index: number;
}

const ShowcaseRow: React.FC<ShowcaseCardProps> = ({ project, index }) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clipId = `showcase-curve-${index % CURVE_PATHS.length}`;
  const liveHref =
    project.liveDemoUrl && project.liveDemoUrl !== '#'
      ? project.liveDemoUrl
      : project.embedUrl || project.githubUrl || '#';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -ny * 5.5,
      ry: nx * 7,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const restTransform =
    index % 2 === 0
      ? 'perspective(1400px) rotateX(5.5deg) rotateY(-4.5deg) rotateZ(-0.4deg) scale(0.985)'
      : 'perspective(1400px) rotateX(4.5deg) rotateY(4deg) rotateZ(0.35deg) scale(0.985)';

  const hoverTransform = `perspective(1400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(0deg) scale(1.015)`;

  return (
    <div ref={rowRef} className="reveal-item grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
      {/* Left Minimal Title Column (Zero paragraph/tag clutter) */}
      <div className="lg:col-span-3 pt-1 lg:pt-4 space-y-1.5 text-left">
        <a
          href={liveHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 text-base sm:text-lg font-semibold text-[#f5f5f5] hover:text-white transition-colors"
        >
          <span>{project.title}</span>
          <ArrowUpRight className="w-4 h-4 text-[#777777] group-hover/link:text-[var(--accent-secondary)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
        </a>

        <p className="text-xs sm:text-sm text-[#787880] font-normal">
          {getProjectSublabel(project)}
        </p>

        <div className="flex items-center gap-3 pt-2 opacity-75 lg:opacity-45 hover:opacity-100 transition-opacity">
          {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[#999999] hover:text-white transition-colors"
            >
              Visit ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#777777] hover:text-white transition-colors"
              aria-label={`${project.title} GitHub`}
              title="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Right Sculptural Warped 3D Showcase */}
      <div
        className="lg:col-span-9 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle Theme Backlight Aura on Hover */}
        <div
          className="pointer-events-none absolute -inset-4 rounded-3xl blur-3xl transition-opacity duration-700"
          style={{
            opacity: isHovered ? 0.32 : 0.08,
            background:
              'radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 72%)',
          }}
          aria-hidden="true"
        />

        {/* Warped Clip-Path Container */}
        <div
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          style={{
            transform: isHovered ? hoverTransform : restTransform,
            filter: isHovered
              ? 'drop-shadow(0 28px 55px rgba(0, 0, 0, 0.78))'
              : 'drop-shadow(0 18px 36px rgba(0, 0, 0, 0.65))',
          }}
        >
          <div
            className="relative w-full h-full overflow-hidden bg-[#0a0a0c]"
            style={{ clipPath: `url(#${clipId})` }}
          >
            {!isNearViewport ? (
              <div className="w-full h-full bg-[#0a0a0d] animate-pulse" />
            ) : project.videoUrl ? (
              <video
                src={project.videoUrl}
                poster={project.image}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}
              />
            ) : project.embedUrl ? (
              <iframe
                src={project.embedUrl}
                title={project.title}
                loading="lazy"
                className="w-full h-full border-0 select-none"
                allow="autoplay; fullscreen"
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transform: isHovered ? 'scale(1.03)' : 'scale(1)' }}
              />
            )}

            {/* Diagonal Glassy Specular Glaze (Fades Out Smoothly on Hover) */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: isHovered ? 0 : 0.42,
                background:
                  'linear-gradient(125deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.18) 46%, rgba(255,255,255,0.06) 50%, rgba(0,0,0,0.45) 100%)',
              }}
            />

            {/* Clickable Launch Hit-Area for Video / Non-iframe Showcases */}
            {!project.embedUrl && (
              <a
                href={liveHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title}`}
                className="absolute inset-0 z-10 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section
      id="projects"
      className="relative py-24 sm:py-36 px-6 sm:px-12 lg:px-16 bg-[var(--bg-pure)] transition-colors duration-500 overflow-hidden"
    >
      {/* Hidden SVG ClipPaths for Sculptural 3D Banner Warping */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {CURVE_PATHS.map((d, i) => (
            <clipPath key={i} id={`showcase-curve-${i}`} clipPathUnits="objectBoundingBox">
              <path d={d} />
            </clipPath>
          ))}
        </defs>
      </svg>

      <div className="max-w-6xl mx-auto">
        {/* Minimal Section Header */}
        <div className="reveal-item mb-16 sm:mb-24 space-y-2 text-left">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#888888] uppercase">
            03 / SELECTED WORK
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f5f5]">
            Featured Projects.
          </h2>
        </div>

        {/* Sculptural Warped Showcase Rows (Minimal Title Left + Curved 3D Preview Right) */}
        <div className="space-y-20 sm:space-y-28">
          {projects.map((project, idx) => (
            <ShowcaseRow key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
