import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_SLIDES, type Car } from "../data";
import { usePrefersReducedMotion } from "../ui";

const N = HERO_SLIDES.length;
const INTERVAL = 6500;

type Props = { onBook: (model: string) => void };

function CarLayer({ car, animClass }: { car: Car; animClass: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[19%] z-10 flex justify-end md:bottom-[14%]">
      <div
        className={`relative mr-[-6%] w-[96vw] max-w-[880px] sm:mr-[0%] sm:w-[66vw] lg:mr-[3%] lg:w-[52vw] ${animClass}`}
      >
        <span
          className="trail-in absolute left-[90%] top-[50%] h-[3px] w-[42vw] max-w-[540px] origin-left rounded-full"
          style={{ background: `linear-gradient(90deg, ${car.accent}cc, transparent)` }}
        />
        <span
          className="trail-in absolute left-[90%] top-[63%] h-[2px] w-[28vw] max-w-[380px] origin-left rounded-full"
          style={{
            background: `linear-gradient(90deg, ${car.accent}88, transparent)`,
            animationDelay: "90ms",
          }}
        />
        <img
          src={car.image}
          alt={`${car.name} — ${car.type}, three-quarter front view in motion`}
          draggable={false}
          className="relative z-10 w-full select-none mix-blend-multiply"
        />
        <span
          className="absolute bottom-[2%] left-[10%] right-[6%] z-0 h-[9%] rounded-[100%] blur-[8px]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(10,21,38,0.28), transparent 70%)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function Hero({ onBook }: Props) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  const indexRef = useRef(0);
  const timeoutRef = useRef(0);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const goTo = useCallback(
    (n: number) => {
      const cur = indexRef.current;
      if (n === cur) return;
      setPrev(cur);
      setIndex(n);
      setZoom(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(
        () => {
          setZoom(false);
          setPrev(null);
        },
        reduced ? 60 : 1050,
      );
    },
    [reduced],
  );

  const goNext = useCallback(() => goTo((indexRef.current + 1) % N), [goTo]);
  const goPrev = useCallback(() => goTo((indexRef.current - 1 + N) % N), [goTo]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(goNext, INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced, paused, index, goNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const car = HERO_SLIDES[index];

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[680px] overflow-hidden bg-mist"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Featured vehicles"
    >
      {/* ambient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-mist to-cloud/70" aria-hidden="true" />
      <div
        className="drift-a absolute -left-[10%] top-[-12%] h-[58vmin] w-[58vmin] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle at 40% 40%, rgba(0,194,217,0.2), transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="drift-b absolute right-[-8%] top-[4%] h-[62vmin] w-[62vmin] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle at 60% 40%, rgba(11,107,255,0.16), transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[52%]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,170,190,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(148,170,190,0.22) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
        }}
        aria-hidden="true"
      />
      {/* per-slide accent tint — the "morph" between models */}
      <div
        key={`tint-${index}`}
        className="anim-fade absolute inset-0"
        style={{ background: `radial-gradient(58% 46% at 70% 42%, ${car.accent}21, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* road */}
      <div className="absolute inset-x-0 bottom-[13%] md:bottom-[15%]" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-transparent via-[#b6c8d6] to-transparent" />
        <div className="relative mt-3 h-[3px] overflow-hidden opacity-80">
          <div
            className={`road-dash h-full w-[200%] ${zoom && !reduced ? "road-fast" : ""}`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #afc3d2 0 46px, transparent 46px 110px)",
            }}
          />
        </div>
        <div className="h-24 bg-gradient-to-b from-[#e7eef4]/90 to-transparent" />
      </div>

      {/* ghost slide numeral */}
      <div
        key={`num-${index}`}
        className="ghost-num rise pointer-events-none absolute right-[2%] top-[12%] z-0 hidden select-none font-display text-[clamp(7rem,16vw,15rem)] font-extrabold leading-none md:block"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        className="spin-slow pointer-events-none absolute bottom-[5%] right-[3%] hidden size-[52vmin] rounded-full border border-dashed border-[#c7d6e4] opacity-70 lg:block"
        aria-hidden="true"
      />

      {/* speed streaks during the drive-by */}
      {zoom && !reduced && (
        <div className="pointer-events-none absolute inset-0 z-[12]" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={`sl-${index}-${i}`}
              className="speedline absolute h-[2px] w-[24vw] rounded-full"
              style={{
                top: `${28 + i * 17}%`,
                animationDelay: `${i * 90}ms`,
                background: `linear-gradient(90deg, ${car.accent}, transparent)`,
              }}
            />
          ))}
        </div>
      )}

      {/* exiting car drives off to the left, entering car cruises in from the right */}
      {prev !== null && !reduced && (
        <div key={`out-${prev}`} className="contents">
          <CarLayer car={HERO_SLIDES[prev]} animClass="car-exit" />
        </div>
      )}
      <div key={`in-${index}`} className="contents">
        <CarLayer car={car} animClass={reduced ? "fade-swap" : "car-enter"} />
      </div>

      {/* copy */}
      <div className="absolute left-[5%] top-[16%] z-20 w-[min(90vw,560px)] md:left-[6%] md:top-[19%]">
        <div key={`copy-${index}`}>
          <div className="rise flex items-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full border bg-white/75 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-600 backdrop-blur-sm"
              style={{ borderColor: `${car.accent}66` }}
            >
              <span className="pulse-dot size-1.5 rounded-full" style={{ background: car.accent }} />
              {car.type}
            </span>
            <span className="hidden text-xs font-extrabold uppercase tracking-[0.22em] text-slate-400 sm:block">
              {car.name}
            </span>
          </div>

          <h1
            className="rise mt-5 font-display text-[clamp(1.85rem,4.4vw,4rem)] font-bold leading-[1.07] tracking-tight text-ink"
            style={{ animationDelay: "70ms" }}
          >
            {car.headline}
          </h1>
          <p
            className="rise mt-4 max-w-md text-base font-medium text-slate-500 md:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            {car.tagline}
          </p>

          <div className="rise mt-7 flex items-center gap-5 md:gap-7" style={{ animationDelay: "210ms" }}>
            {[
              [String(car.range), "km range"],
              [car.accel, "s · 0–100"],
              [String(car.top), "km/h top"],
            ].map(([v, l], i) => (
              <div key={l} className={i > 0 ? "border-l border-slate-200 pl-5 md:pl-7" : ""}>
                <div className="font-display text-xl font-bold tabular-nums text-ink md:text-2xl">{v}</div>
                <div className="mt-0.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
                  {l}
                </div>
              </div>
            ))}
          </div>

          <div className="rise mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "280ms" }}>
            <button
              onClick={() => onBook(car.name)}
              className="group inline-flex items-center gap-3 rounded-full bg-ampere px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_14px_34px_-10px_rgba(11,107,255,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink md:text-base"
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
              className="inline-flex items-center rounded-full border border-slate-300 bg-white/60 px-6 py-3.5 text-sm font-extrabold text-ink backdrop-blur-sm transition-colors duration-300 hover:border-ink md:text-base"
            >
              Explore lineup
            </a>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        className="absolute bottom-[12%] left-[5%] z-20 hidden flex-col items-center gap-3 md:flex md:left-[6%]"
        aria-hidden="true"
      >
        <span className="text-[10px] font-extrabold uppercase tracking-[0.34em] text-slate-400 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-slate-300">
          <span className="cue-dot absolute left-0 top-0 h-5 w-px rounded-full bg-ampere" />
        </span>
      </div>

      {/* controls */}
      <div className="absolute inset-x-[5%] bottom-[3.5%] z-30 flex items-center gap-3 md:inset-x-[6%] md:gap-5">
        <div className="flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 p-1.5 shadow-[0_12px_34px_-18px_rgba(10,21,38,0.4)] backdrop-blur-md">
          <button
            onClick={goPrev}
            aria-label="Previous model"
            className="flex size-10 items-center justify-center rounded-full text-ink transition-all duration-300 hover:bg-ink hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Next model"
            className="flex size-10 items-center justify-center rounded-full text-ink transition-all duration-300 hover:bg-ink hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <span className="mx-1 hidden h-5 w-px bg-slate-200 sm:block" />
          <div className="flex items-center gap-2 px-1">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Go to ${s.name}`}
                aria-current={i === index}
                className="relative h-[6px] w-12 overflow-hidden rounded-full bg-[#d4dfe8] transition-colors duration-300 hover:bg-[#c3d2de] md:w-16"
              >
                {i === index && (
                  <span
                    key={`fill-${index}`}
                    className="fillbar absolute inset-0 origin-left rounded-full"
                    style={{
                      background: s.accent,
                      animationDuration: reduced ? "0.01ms" : `${INTERVAL}ms`,
                      animationPlayState: paused ? "paused" : "running",
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
            className="mx-0.5 flex size-8 items-center justify-center rounded-full text-slate-500 transition-colors duration-300 hover:bg-mist hover:text-ink"
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

        <div className="ml-auto hidden items-center gap-3 rounded-full border border-white/70 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur-md sm:flex">
          <span className="font-display text-base font-bold tabular-nums text-ink">
            0{index + 1}
          </span>
          <span className="text-xs font-extrabold text-slate-400">/ 0{N}</span>
          <span className="h-4 w-px bg-slate-200" />
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
            {car.name}
          </span>
        </div>
      </div>
    </section>
  );
}
