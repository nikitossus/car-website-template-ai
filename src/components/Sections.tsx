import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  CARS,
  FEATURES,
  INTERIORS,
  STATS,
  TESTIMONIALS,
  TICKER_ITEMS,
  type Feature,
} from "../data";
import {
  Reveal,
  SectionTag,
  useCountUp,
  useInView,
  usePrefersReducedMotion,
} from "../ui";

/* ---------- shared bits ---------- */

function Spark({ color, className = "size-3" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} style={{ color }} fill="currentColor" aria-hidden="true">
      <path d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6L12 22.5l-2.6-7.9-7.9-2.6 7.9-2.6L12 1.5z" />
    </svg>
  );
}

function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function FeatureIcon({ name }: { name: Feature["icon"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "bolt" && <path d="M13 2.5 5.5 13H11l-1.5 8.5L17 11h-5.5l1.5-8.5z" />}
      {name === "battery" && (
        <>
          <rect x="2.5" y="8" width="16" height="9" rx="2" />
          <path d="M21.5 11v3" />
          <path d="m6.5 12.5 2-.1 1-1.9 1.6 3.6 1-1.7h2.4" />
        </>
      )}
      {name === "wheel" && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="2.6" />
          <path d="M3.6 11.2h5.9M14.5 11.2h5.9M12 14.6v5.8" />
        </>
      )}
      {name === "shield" && (
        <>
          <path d="M12 3 5 5.8v5.4c0 4.5 3 7.6 7 9.3 4-1.7 7-4.8 7-9.3V5.8L12 3z" />
          <path d="m9 11.6 2.1 2.1 4.2-4.7" />
        </>
      )}
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-4"
      fill={filled ? "#29e07e" : "none"}
      stroke={filled ? "#29e07e" : "#c6d3de"}
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 1.8l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.6-5 2.6.9-5.6-4-4 5.6-.8L10 1.8z" />
    </svg>
  );
}

/* ---------- ticker ---------- */

export function Ticker() {
  const colors = ["#0b6bff", "#00c2d9", "#29e07e"];
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative z-20 overflow-hidden border-y border-white/10 bg-ink" aria-hidden="true">
      <div className="marquee-track flex w-max items-center py-3.5">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-6 font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-white/85 md:text-xs">
              {t}
            </span>
            <Spark color={colors[i % 3]} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- featured models ---------- */

export function Featured({ onBook }: { onBook: (model: string) => void }) {
  return (
    <section id="models" className="relative scroll-mt-20 overflow-hidden bg-paper py-24 md:py-32">
      <div
        className="drift-b absolute right-[-12%] top-[6%] h-[48vmin] w-[48vmin] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,194,217,0.16), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1280px] px-[5%] md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionTag color="#00c2d9">The lineup · 2026</SectionTag>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(1.7rem,3.4vw,3rem)] font-bold leading-[1.12] tracking-tight text-ink">
              Six ways to go{" "}
              <span className="relative inline-block text-ampere">
                electric.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 10" fill="none" aria-hidden="true">
                  <path d="M3 7c22-5 62-5 114-2" stroke="#00c2d9" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-base font-medium leading-relaxed text-slate-500">
            One 800-volt platform, six personalities. Every model below is in
            stock at a European showroom today — reserve your drive in three taps.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {CARS.map((car, i) => (
            <Reveal key={car.id} delay={(i % 3) * 90} className="h-full">
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-cloud bg-white shadow-[0_18px_44px_-26px_rgba(10,21,38,0.22)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[color:var(--acc)] hover:shadow-[0_36px_66px_-26px_rgba(10,21,38,0.32)]"
                style={{ "--acc": car.accent } as CSSProperties}
              >
                <span
                  className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, ${car.accent}, transparent)` }}
                />
                <div className="relative flex h-52 items-end justify-center overflow-hidden bg-gradient-to-b from-mist via-white to-white px-6 pt-9">
                  <span className="absolute left-4 top-4 rounded-full border border-cloud bg-white/85 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
                    {car.type}
                  </span>
                  <img
                    src={car.image}
                    alt={`${car.name} ${car.type}`}
                    loading="lazy"
                    draggable={false}
                    className="h-40 w-auto max-w-full select-none object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:-translate-x-2 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6 pt-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg font-bold text-ink">{car.name}</h3>
                    <span className="whitespace-nowrap text-xs font-extrabold text-slate-400">
                      from {car.price}
                    </span>
                  </div>
                  <p className="-mt-2 text-sm font-medium leading-relaxed text-slate-500">
                    {car.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[`${car.range} km`, `${car.accel} s 0–100`, `${car.top} km/h`].map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-cloud bg-mist px-3 py-1 text-[11px] font-bold text-slate-500"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onBook(car.name)}
                    className="mt-auto inline-flex items-center gap-3 self-start pt-1 text-sm font-extrabold text-ink transition-colors duration-300 hover:text-ampere"
                  >
                    <span
                      className="flex size-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
                      style={{ background: car.accent, color: car.chipFg }}
                    >
                      <ArrowIcon className="size-4" />
                    </span>
                    Book test drive
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- interiors showcase ---------- */

export function Interiors() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const scroll = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * Math.min(el.clientWidth * 0.75, 640),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section id="interiors" className="relative scroll-mt-20 overflow-hidden bg-mist py-24 md:py-32">
      <div
        className="drift-a absolute left-[-10%] top-[30%] h-[44vmin] w-[44vmin] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(11,107,255,0.12), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1280px] px-[5%] md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionTag color="#29e07e">Inside the lineup</SectionTag>
            <h2 className="mt-5 font-display text-[clamp(1.7rem,3.4vw,3rem)] font-bold leading-[1.12] tracking-tight text-ink">
              Step into <span className="text-volt">the quiet.</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="hidden max-w-xs text-base font-medium leading-relaxed text-slate-500 md:block">
              Three cabins, three moods — every surface chosen to disappear at
              300 km/h and reappear at a standstill.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => scroll(-1)}
                aria-label="Scroll interiors left"
                className="flex size-11 items-center justify-center rounded-full border border-cloud bg-white text-ink shadow-sm transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Scroll interiors right"
                className="flex size-11 items-center justify-center rounded-full border border-cloud bg-white text-ink shadow-sm transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-12">
        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-[5%] pb-4 md:px-[max(5%,calc((100vw-1280px)/2+2rem))]"
        >
          {INTERIORS.map((it, i) => (
            <figure
              key={it.id}
              className="group relative min-w-[84vw] snap-center overflow-hidden rounded-[1.4rem] border border-cloud shadow-[0_26px_54px_-32px_rgba(10,21,38,0.4)] sm:min-w-[48vw] lg:min-w-[40vw]"
            >
              <div className="overflow-hidden">
                <img
                  src={it.image}
                  alt={`${it.model} interior — ${it.title}`}
                  loading="lazy"
                  className="kenburns aspect-[16/10] w-full object-cover"
                />
              </div>
              <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-ink/25 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                {it.model}
              </span>
              <span className="absolute right-4 top-4 font-display text-xs font-bold text-white/80">
                0{i + 1} / 0{INTERIORS.length}
              </span>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-6 pt-20 text-white">
                <h3 className="font-display text-lg font-bold md:text-xl">{it.title}</h3>
                <p className="mt-1.5 max-w-md text-sm font-medium leading-relaxed text-white/70">
                  {it.copy}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[5%] bg-gradient-to-r from-mist to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[5%] bg-gradient-to-l from-mist to-transparent" aria-hidden="true" />
      </div>

      <p className="mt-6 px-[5%] text-xs font-extrabold uppercase tracking-[0.24em] text-slate-400 md:px-[max(5%,calc((100vw-1280px)/2+2rem))]">
        Drag, scroll or use the arrows
      </p>
    </section>
  );
}

/* ---------- experience: features + stats ---------- */

function StatTile({ stat, delay }: { stat: (typeof STATS)[number]; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const value = useCountUp(stat.value, inView, 1800, stat.decimals);
  return (
    <Reveal delay={delay} className="h-full">
      <div
        ref={ref}
        className={`relative h-full overflow-hidden rounded-[1.2rem] border p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7 ${
          stat.dark ? "border-ink bg-ink text-white" : "border-cloud bg-white"
        }`}
      >
        <span
          className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full opacity-[0.14] blur-2xl"
          style={{ background: stat.color }}
          aria-hidden="true"
        />
        <div
          className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-bold tabular-nums"
          style={{ color: stat.dark ? "#ffffff" : "#0a1526" }}
        >
          {value}
          <span style={{ color: stat.color }}>{stat.suffix}</span>
        </div>
        <div
          className={`mt-2 text-[11px] font-extrabold uppercase tracking-[0.18em] ${
            stat.dark ? "text-white/60" : "text-slate-400"
          }`}
        >
          {stat.label}
        </div>
        <div className={`mt-0.5 text-xs font-medium ${stat.dark ? "text-white/45" : "text-slate-400"}`}>
          {stat.sub}
        </div>
      </div>
    </Reveal>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-20 overflow-hidden bg-paper py-24 md:py-32">
      <div
        className="drift-a absolute left-[-14%] top-[10%] h-[50vmin] w-[50vmin] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,194,217,0.13), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1280px] gap-16 px-[5%] md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <SectionTag color="#0b6bff">Why Veloce</SectionTag>
          <h2 className="mt-5 font-display text-[clamp(1.7rem,3.4vw,3rem)] font-bold leading-[1.12] tracking-tight text-ink">
            Engineered obsession,
            <br />
            delivered with care.
          </h2>
          <p className="mt-5 max-w-lg text-base font-medium leading-relaxed text-slate-500">
            We don't sell cars off a lot. Every Veloce is built to order,
            charged to 100%, hand-finished and driven to your doorstep by the
            technician who signed it off.
          </p>

          <div className="mt-10 space-y-7">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="group flex items-start gap-5">
                  <span
                    className="flex size-12 shrink-0 items-center justify-center rounded-[0.9rem] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                    style={{ background: `${f.color}1a`, color: f.color }}
                  >
                    <FeatureIcon name={f.icon} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">{f.title}</h3>
                    <p className="mt-1 max-w-md text-sm font-medium leading-relaxed text-slate-500">
                      {f.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:pt-24">
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {STATS.map((s, i) => (
              <StatTile key={s.label} stat={s} delay={i * 90} />
            ))}
          </div>
          <Reveal delay={340} className="mt-4 md:mt-5">
            <div className="flex items-center gap-4 rounded-[1.2rem] border border-cloud bg-mist px-6 py-5">
              <span className="pulse-dot size-2.5 shrink-0 rounded-full bg-neon" />
              <p className="text-sm font-semibold text-slate-600">
                Live right now: <span className="text-ink">23 Veloces</span>{" "}
                charging at partner pillars near you.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */

function initials(name: string) {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const count = TESTIMONIALS.length;

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => setIdx((v) => (v + 1) % count), 7000);
    return () => window.clearInterval(id);
  }, [reduced, paused, count]);

  return (
    <section
      id="reviews"
      className="relative scroll-mt-20 overflow-hidden bg-mist py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span
        className="pointer-events-none absolute -top-10 right-[4%] select-none font-display text-[clamp(10rem,26vw,22rem)] font-extrabold leading-none text-ink/[0.04]"
        aria-hidden="true"
      >
        ”
      </span>
      <div className="relative mx-auto max-w-[1280px] px-[5%] md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionTag color="#29e07e">Owners</SectionTag>
            <h2 className="mt-5 font-display text-[clamp(1.7rem,3.4vw,3rem)] font-bold leading-[1.12] tracking-tight text-ink">
              12,480 drivers. <span className="text-ampere">Zero regrets.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base font-medium leading-relaxed text-slate-500">
            Unedited words from the people who signed, charged and drove away.
            Rotating every few seconds — or take the wheel below.
          </p>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[1.6rem] border border-cloud bg-white shadow-[0_32px_72px_-42px_rgba(10,21,38,0.4)]">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {TESTIMONIALS.map((item) => (
              <blockquote key={item.name} className="min-w-full p-8 md:p-14">
                <div className="flex items-center justify-between gap-6">
                  <span
                    className="font-display text-6xl leading-none md:text-7xl"
                    style={{ color: item.accent }}
                    aria-hidden="true"
                  >
                    “
                  </span>
                  <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} filled={i < item.rating} />
                    ))}
                  </div>
                </div>
                <p className="mt-4 max-w-3xl font-display text-lg font-medium leading-[1.55] text-ink md:text-[1.5rem]">
                  {item.quote}
                </p>
                <footer className="mt-8 flex flex-wrap items-center gap-4">
                  <span
                    className="flex size-12 items-center justify-center rounded-full font-display text-sm font-bold"
                    style={{ background: `${item.accent}22`, color: item.accent }}
                  >
                    {initials(item.name)}
                  </span>
                  <div>
                    <div className="font-bold text-ink">{item.name}</div>
                    <div className="text-xs font-semibold text-slate-400">{item.role}</div>
                  </div>
                  <span className="ml-auto rounded-full border border-cloud bg-mist px-4 py-1.5 text-xs font-extrabold text-slate-500">
                    Drives a {item.car}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={() => setIdx((idx - 1 + count) % count)}
            aria-label="Previous review"
            className="flex size-11 items-center justify-center rounded-full border border-cloud bg-white text-ink shadow-sm transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            onClick={() => setIdx((idx + 1) % count)}
            aria-label="Next review"
            className="flex size-11 items-center justify-center rounded-full border border-cloud bg-white text-ink shadow-sm transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setIdx(i)}
                aria-label={`Show review ${i + 1}`}
                aria-current={i === idx}
                className={`h-2 rounded-full transition-all duration-400 ${
                  i === idx ? "w-7 bg-ink" : "w-2 bg-[#c6d3de] hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
          <span className="ml-auto hidden font-display text-xs font-bold tracking-[0.22em] text-slate-400 sm:block">
            0{idx + 1} / 0{count}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */

export function CtaBand({ onBook }: { onBook: () => void }) {
  return (
    <section className="bg-paper px-[5%] py-12 md:px-8 md:py-16">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] bg-ink px-8 py-14 text-white md:px-16 md:py-20">
        <span
          className="pointer-events-none absolute inset-x-0 top-[30%] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,194,217,0.75), transparent)" }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-x-0 top-[64%] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(41,224,126,0.6), transparent)" }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -bottom-8 right-0 select-none font-display text-[clamp(4.5rem,13vw,10rem)] font-extrabold leading-none"
          style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.14)" }}
          aria-hidden="true"
        >
          VELOCE
        </span>

        <div className="relative flex flex-wrap items-center justify-between gap-10">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.24em] text-white/70">
              <span className="pulse-dot size-1.5 rounded-full bg-neon" />
              No obligation · 30 minutes
            </span>
            <h2 className="mt-5 font-display text-[clamp(1.7rem,3.4vw,2.9rem)] font-bold leading-[1.12] tracking-tight">
              Feel 2.4 seconds of <span className="text-volt">pure silence.</span>
            </h2>
            <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-white/60">
              Book a test drive at any of our six European showrooms. Charged,
              detailed and waiting with your name on the dash.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onBook}
              className="group inline-flex items-center gap-3 rounded-full bg-neon px-8 py-4 text-base font-extrabold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Book test drive
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </button>
            <a
              href="tel:+498912004040"
              className="inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-base font-bold text-white transition-colors duration-300 hover:border-volt hover:text-volt"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
              </svg>
              +49 89 1200 4040
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
