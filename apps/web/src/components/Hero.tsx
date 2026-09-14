import React, { Fragment, useRef, useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface HeroProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
}

// ── Grid constants ─────────────────────────────────────────────────────────
const CELL = 86;   // px — cell size
const GAP  = 5;    // px — gap between cells
const STEP = CELL + GAP;   // 91
const COLS = 7;
const ROWS = 6;
const N    = COLS * ROWS;  // 42 cells

// Deterministic bar widths per cell (5 bars each, no randomness at runtime)
const BARS: number[][] = Array.from({ length: N }, (_, i) => {
  const s = i * 37 + 11;
  return [
    0.45 + (s % 40) / 100,
    0.28 + ((s * 3) % 52) / 100,
    0.62 + ((s * 7) % 28) / 100,
    0.38 + ((s * 13) % 46) / 100,
    0.22 + ((s * 19) % 55) / 100,
  ];
});

// Pre-seeded base opacity — visible even without cursor
const BASE = new Float32Array(N);
([ // [col, row, opacity]
  [2,0,0.28],[4,0,0.16],
  [1,1,0.38],[3,1,0.20],[5,1,0.14],
  [2,2,0.46],[4,2,0.26],[6,2,0.16],
  [0,3,0.18],[3,3,0.36],[5,3,0.24],
  [2,4,0.16],[4,4,0.30],[6,4,0.12],
  [1,5,0.20],[3,5,0.14],[5,5,0.26],
] as [number,number,number][]).forEach(([c,r,o]) => { BASE[c + r * COLS] = o; });

// Cells that get an amber accent bar (bar index 1)
const AMBER = new Set<number>(
  Array.from({ length: N }, (_, i) => {
    const col = i % COLS, row = Math.floor(i / COLS);
    return (col + row) % 6 === 2 ? i : -1;
  }).filter(i => i >= 0)
);

// ── Component ──────────────────────────────────────────────────────────────
export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenConsultation }) => {
  const { language, t, getLoc } = useLanguage();
  const { banners } = useData();
  const banner = banners.find((b) => b.active) || banners[0];

  const titleText = getLoc(banner, 'title');
  const subtitle  = getLoc(banner, 'subtitle') || (language === 'ru'
    ? 'Солнечные водонагреватели TANSO для дома и бизнеса: напорные, безнапорные и SPLIT-системы.'
    : 'Uy va biznes uchun TANSO quyosh suv isitgichlari: bosimli, bosimsiz va SPLIT tizimlar.');

  const titleLines = (titleText && titleText.includes('\n'))
    ? titleText.split('\n')
    : language === 'ru'
      ? ['Горячая вода', 'от солнца', 'каждый день']
      : ['Quyoshdan', 'issiq suv ', 'har kuni'];

  // ── Cursor-reactive grid refs ──────────────────────────────────────────
  const sectionRef  = useRef<HTMLElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const cellRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const barsRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const mouse       = useRef({ x: -9999, y: -9999, in: false });
  const strengths   = useRef(new Float32Array(N));
  const gridOrigin  = useRef({ x: 0, y: 0 });
  const rafId       = useRef<number>(0);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = sectionRef.current;
    const grid    = gridRef.current;
    if (!section || !grid) return;

    // Cache grid's top-left corner in section-local coordinates
    const cacheOrigin = () => {
      const sr = section.getBoundingClientRect();
      const gr = grid.getBoundingClientRect();
      gridOrigin.current = { x: gr.left - sr.left, y: gr.top - sr.top };
    };

    // After first layout paint
    requestAnimationFrame(() => requestAnimationFrame(cacheOrigin));

    const RADIUS   = 280;
    const LERP_IN  = 0.16;
    const LERP_OUT = 0.08;

    const tick = () => {
      const { x: mx, y: my, in: inside } = mouse.current;
      const { x: gx, y: gy } = gridOrigin.current;

      for (let i = 0; i < N; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);

        // Cell centre in section-local coords
        const cx = gx + col * STEP + CELL / 2;
        const cy = gy + row * STEP + CELL / 2;

        const dist   = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
        const target = inside ? Math.max(0, 1 - dist / RADIUS) : 0;

        // Smooth lerp — faster approach, slower retreat
        const prev = strengths.current[i];
        const lf   = target > prev ? LERP_IN : LERP_OUT;
        const s    = prev + (target - prev) * lf;
        strengths.current[i] = s;

        const eff = Math.max(BASE[i], s); // base always visible

        // Bars opacity
        const barsEl = barsRefs.current[i];
        if (barsEl) barsEl.style.opacity = eff.toFixed(3);

        // Cell border + background + subtle scale
        const cellEl = cellRefs.current[i];
        if (cellEl) {
          const bAlpha = 0.07 + s * 0.45;
          const bgA    = eff * 0.09;
          const sc     = 1 + s * 0.04;
          cellEl.style.borderColor       = `rgba(4,175,157,${bAlpha.toFixed(3)})`;
          cellEl.style.backgroundColor   = `rgba(4,175,157,${bgA.toFixed(3)})`;
          cellEl.style.transform         = `scale(${sc.toFixed(4)})`;
        }
      }

      rafId.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const sr = section.getBoundingClientRect();
      mouse.current = { x: e.clientX - sr.left, y: e.clientY - sr.top, in: true };
    };
    const onLeave  = () => { mouse.current.in = false; };
    const onResize = () => cacheOrigin();

    section.addEventListener('mousemove', onMove, { passive: true });
    section.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="scroll-mt-28 relative flex items-center overflow-hidden bg-[var(--ink)] pt-16 lg:pt-14"
    >
      {/* ── Background layers ─────────────────────────────────────────── */}
      <div className="absolute inset-0">
        {banner?.bgImageUrl && (
          <img
            src={banner.bgImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink)_0%,var(--ink)_44%,rgba(16,33,27,.80)_68%,rgba(16,33,27,.96)_100%)]" />
        <div className="bg-line-grid-dark absolute inset-0 opacity-30" />

        {/* ── Render-style interactive grid (desktop only) ──────────── */}
        <div
          ref={gridRef}
          className="absolute pointer-events-none hidden lg:grid"
          style={{
            left: '47%', right: '-4px', top: 0, bottom: 0,
            gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
            gridTemplateRows:    `repeat(${ROWS}, ${CELL}px)`,
            gap: `${GAP}px`,
            alignContent: 'center',
            overflow: 'visible',
          }}
        >
          {Array.from({ length: N }, (_, i) => {
            const bars     = BARS[i];
            const hasAmber = AMBER.has(i);
            return (
              <div
                key={i}
                ref={el => { cellRefs.current[i] = el; }}
                style={{
                  border: '1px solid rgba(4,175,157,0.07)',
                  borderRadius: 3,
                  position: 'relative',
                  backgroundColor: 'transparent',
                  transformOrigin: 'center',
                  willChange: 'transform',
                  overflow: 'hidden',
                }}
              >
                {/* Inner bars */}
                <div
                  ref={el => { barsRefs.current[i] = el; }}
                  style={{
                    position: 'absolute', inset: 0,
                    padding: '11px 11px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 5,
                    opacity: BASE[i],
                  }}
                >
                  {bars.map((w, j) => (
                    <div
                      key={j}
                      style={{
                        height: j === 2 ? 3 : 2,
                        width: `${(w * 100).toFixed(1)}%`,
                        borderRadius: 2,
                        backgroundColor: (hasAmber && j === 1)
                          ? 'rgba(251,148,37,0.90)'
                          : j === 0
                            ? 'rgba(4,175,157,0.95)'
                            : j === 2
                              ? 'rgba(127,216,199,0.80)'
                              : 'rgba(4,175,157,0.65)',
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtle ambient glow (static) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 55% at 74% 50%, rgba(4,175,157,0.10) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Hero content ─────────────────────────────────────────────── */}
      <div className="relative z-10 tanso-container py-7 lg:py-9">
        <div className="grid lg:grid-cols-[1.02fr_.98fr] items-center gap-8 lg:gap-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
              className="kicker-dark mb-5"
            >
              TANSO • O'ZBEKISTON
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, delay: .08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white"
            >
              {titleLines.map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .65, delay: .16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--muted-dark)]"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .65, delay: .24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex flex-col sm:flex-row gap-3"
            >
              <button onClick={() => onNavigate(banner?.buttonLink || '/catalog')} className="btn-primary group">
                <span>{getLoc(banner, 'buttonText') || t('viewProducts')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={onOpenConsultation} className="btn-secondary-dark">
                <Phone className="w-4 h-4 text-[var(--amber)]" />
                <span>{t('freeConsultation')}</span>
              </button>
            </motion.div>
          </div>

          {/* Product image — sits in front of the grid */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: .96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 2.4, delay: .22, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] flex items-center justify-center pb-4 lg:pb-0"
          >
            <div className="absolute w-[80%] aspect-square rounded-full border border-white/[0.06]" />

            <div className="relative z-10 w-[76%] sm:w-[70%] lg:w-[80%] drop-shadow-[0_36px_50px_rgba(0,0,0,.6)]">
              <img
                src="/images/products/tanso-bosimsiz-main.png"
                alt="TANSO quyosh suv isitgichi"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="absolute z-30 right-2 sm:right-6 lg:right-3 bottom-3 sm:bottom-5 lg:bottom-7 max-w-[250px] card-dark px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--amber)]" />
                <div>
                  <p className="text-[9px] uppercase tracking-[.16em] text-[var(--muted-dark)]">TANSO</p>
                  <p className="text-[11px] sm:text-xs font-semibold text-white">
                    {language === 'ru' ? 'Солнечные водонагреватели' : 'Quyosh suv isitgichlari'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-white/10" />
    </section>
  );
};
