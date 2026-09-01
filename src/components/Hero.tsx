import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { HERO_SLIDES, type Car } from "../data";
import { usePrefersReducedMotion } from "../ui";

const N = HERO_SLIDES.length;
const INTERVAL = 7000;
const SWAP_MS = 1150;
const EASE = "cubic-bezier(0.72, 0, 0.24, 1)";

type Anim = { from: number; to: number; dir: 1 | -1; ready: boolean };
type Props = { onBook: (model: string) => void };

/* ---------------- film layer with source fallback ---------------- */

function HeroFilm({ car, active }: { car: Car; active: boolean }) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLVideoElement | null>(null);
  const sources = car.videoSources ?? [];
  const exhausted = sources.length === 0 || idx >= sources.length;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) v.play().catch(() => undefined);
    else v.pause();
  }, [active, idx, exhausted]);

  if (exhausted) {
    // graceful fallback: the studio still, slowly breathing
    return (
      <img
        src={car.image}
        alt=""
        aria-hidden="true"
        className="kenburns h-full w-full object-cover"
      />
    );
  }

  return (
    <video
      key={idx}
      ref={ref}
      src={sources[idx]}
      onError={() => setIdx((i) => i + 1)}
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      className="h-full w-full object-cover"
    />
  );
}

/* ---------------- slide stage ---------------- */

function SlideLayer({
  car,
  style,
  active,
}: {
  car: Car;
  style: CSSProperties;
  active: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-deep" style={style} aria-hidden={!active}>
      <HeroFilm car={car} active={active} />
    </div>
  );
}

export default function Hero({ onBook }: Props) {
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState<Anim | null>(null);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  const indexRef = useRef(0);
  const animRef = useRef<Anim | null>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  useEffect(() => {
    animRef.current = anim;
  }, [anim]);
  useEffect(
    () => () => timers.current.forEach((t) => window.clearTimeout(t)),
    [],
  );

  /* The video trick: current film drives off one side while the next
     arrives from the opposite side — both keep rolling during the pass. */
  const goTo = useCallback(
    (n: number, dirHint?: 1 | -1) => {
      const cur = indexRef.current;
      if (animRef.current || n === cur) return;
      const dir: 1 | -1 = dirHint ?? (n > cur ? 1 : -1);
      setAnim({ from: cur, to: n, dir, ready: false });
      timers.current.push(
        window.setTimeout(() => setAnim((a) => (a ? { ...a, ready: true } : a)), 30),
      );
      timers.current.push(
        window.setTimeout(
          () => {
            setIndex(n);
            setAnim(null);
          },
          reduced ? 650 : SWAP_MS + 40,
        ),
      );
    },
    [reduced],
  );

  const goNext = useCallback(() => goTo((indexRef.current + 1) % N, 1), [goTo]);
  const goPrev = useCallback(() => goTo((indexRef.current - 1 + N) % N, -1), [goTo]);

  useEffect(() => {
    if (reduced || paused || anim) return;
    const id = window.setInterval(goNext, INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced, paused, anim, index, goNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const layerStyle = (i: number): CSSProperties => {
    if (!anim) {
      return i === index
        ? { transform: "none", opacity: 1, zIndex: 2 }
        : { transform: "translateX(101%)", opacity: 0, zIndex: 0, transition: "none" };
    }
    if (i === anim.from) {
      const off = anim.dir === 1 ? "-101%" : "101%";
      return {
        transform: anim.ready ? `translateX(${off})` : "translateX(0)",
        filter: anim.ready ? "blur(6px)" : "blur(0)",
        opacity: 1,
        zIndex: 2,
        transition: anim.ready
          ? `transform ${SWAP_MS}ms ${EASE}, filter ${SWAP_MS}ms ${EASE}`
          : "none",
        willChange: "transform, filter",
      };
    }
    if (i === anim.to) {
      const off = anim.dir === 1 ? "101%" : "-101%";
      return reduced
        ? { transform: "none", opacity: anim.ready ? 1 : 0, zIndex: 3, transition: anim.ready ? "opacity 600ms ease" : "none" }
        : {
            transform: anim.ready ? "translateX(0)" : `translateX(${off})`,
            opacity: 1,
            zIndex: 3,
            transition: anim.ready ? `transform ${SWAP_MS}ms ${EASE}` : "none",
            willChange: "transform",
          };
    }
    return { transform: "translateX(101%)", opacity: 0, zIndex: 0, transition: "none" };
  };

  const car = HERO_SLIDES[index];
  const swapping = anim !== null && anim.ready && !reduced;

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-deep"
      aria-label="Featured vehicles"
    >
      {/* film stack */}
      {HERO_SLIDES.map((s, i) => (
        <SlideLayer
          key={s.id}
          car={s}
          active={anim ? i === anim.to || i === anim.from : i === index}
          style={layerStyle(i)}
        />
      ))}

      {/* readability gradients */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-deep/85 via-deep/40 to-deep/5" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-deep/80 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-deep/60 to-transparent" aria-hidden="true" />
      {/* per-model accent wash — the morph between films */}
      <div
        key={`tint-${index}`}
        className="anim-fade pointer-events-none absolute inset-0 z-10"
        style={{ background: `radial-gradient(52% 44% at 74% 40%, ${car.accent}24, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* ghost numeral */}
      <div
        key={`num-${index}`}
        className="rise pointer-events-none absolute right-[2%] top-[13%] z-10 hidden select-none font-display text-[clamp(7rem,15vw,14rem)] font-extrabold leading-none text-white/[0.07] md:block"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* speed streaks during the pass */}
      {swapping && (
        <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={`sl-${anim.from}-${i}`}
              className="speedline absolute h-[2px] rounded-full"
              style={{
                top: `${22 + i * 16}%`,
                width: `${18 + (i % 2) * 10}vw`,
                animationDelay: `${i * 70}ms`,
                background: `linear-gradient(90deg, ${car.accent}, transparent)`,
              }}
            />
          ))}
        </div>
      )}

      {/* copy */}
      <div className="absolute left-[5%] top-[21%] z-30 w-[min(90vw,600px)] md:left-[6%] md:top-[23%]">
        <div key={`copy-${index}`}>
          <div className="rise flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white backdrop-blur-md">
              <span className="pulse-dot size-1.5 rounded-full" style={{ background: car.accent }} />
              {car.type}
            </span>
            <span className="hidden text-xs font-extrabold uppercase tracking-[0.22em] text-white/60 sm:block">
              {car.name}
            </span>
          </div>

          <h1
            className="rise mt-5 font-display text-[clamp(1.9rem,4.6vw,4.1rem)] font-bold leading-[1.06] tracking-tight text-white"
            style={{ animationDelay: "80ms", textShadow: "0 2px 30px rgba(7,15,29,0.45)" }}
          >
            {car.headline}
          </h1>

          <p
            className="rise mt-4 max-w-md text-base font-medium leading-relaxed text-white/75 md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {car.tagline}
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-5" style={{ animationDelay: "240ms" }}>
            <button
              onClick={() => onBook(car.name)}
              className="group inline-flex items-center gap-3 rounded-full bg-ampere px-8 py-4 text-sm font-extrabold text-white shadow-[0_18px_44px_-12px_rgba(11,107,255,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-volt hover:text-ink md:text-base"
            >
              Book test drive
              <svg
                viewBox="0 0 24 24"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <a
              href="#models"
              className="group inline-flex items-center gap-2 text-sm font-extrabold text-white/85 transition-colors duration-300 hover:text-white md:text-base"
            >
              Explore lineup
              <span className="h-px w-7 bg-white/40 transition-all duration-300 group-hover:w-10 group-hover:bg-neon" />
            </a>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-[13%] left-[5%] z-30 hidden flex-col items-center gap-3 md:flex md:left-[6%]" aria-hidden="true">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.34em] text-white/50 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-white/25">
          <span className="cue-dot absolute left-0 top-0 h-5 w-px rounded-full bg-volt" />
        </span>
      </div>

      {/* glass controls */}
      <div className="absolute inset-x-[5%] bottom-[4%] z-40 flex items-center gap-3 md:inset-x-[6%] md:gap-5">
        <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 p-1.5 shadow-[0_16px_44px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <button
            onClick={goPrev}
            aria-label="Previous model"
            className="flex size-10 items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-white hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Next model"
            className="flex size-10 items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-white hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <span className="mx-1 hidden h-5 w-px bg-white/20 sm:block" />
          <div className="flex items-center gap-2 px-1" role="tablist" aria-label="Slides">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to ${s.name}`}
                className="relative h-[6px] w-12 overflow-hidden rounded-full bg-white/25 transition-colors duration-300 hover:bg-white/40 md:w-16"
              >
                {i === index && (
                  <span
                    key={`fill-${index}`}
                    className="fillbar absolute inset-0 origin-left rounded-full"
                    style={{
                      background: s.accent,
                      animationDuration: reduced ? "0.01ms" : `${INTERVAL}ms`,
                      animationPlayState: paused || anim ? "paused" : "running",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
            aria-pressed={paused}
            className="mx-0.5 flex size-8 items-center justify-center rounded-full text-white/70 transition-colors duration-300 hover:bg-white/15 hover:text-white"
          >
            {paused ? (
              <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
                <path d="M7 4.5v15l13-7.5L7 4.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
                <rect x="5.5" y="4.5" width="4.5" height="15" rx="1.2" />
                <rect x="14" y="4.5" width="4.5" height="15" rx="1.2" />
              </svg>
            )}
          </button>
        </div>

        <div className="ml-auto hidden items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-xl sm:flex">
          <span className="font-display text-base font-bold tabular-nums text-white">
            0{index + 1}
          </span>
          <span className="text-xs font-extrabold text-white/50">/ 0{N}</span>
          <span className="h-4 w-px bg-white/20" />
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/75">
            {car.name}
          </span>
        </div>
      </div>
    </section>
  );
}
