import { useState, type FormEvent } from "react";
import { CARS } from "../data";
import { LogoMark, usePrefersReducedMotion } from "../ui";

export default function Footer({ onBook }: { onBook: () => void }) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const reduced = usePrefersReducedMotion();

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  const onJoin = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-deep pb-10 pt-20 text-slate-400">
      <span
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(11,107,255,0.85), rgba(0,194,217,0.85), rgba(41,224,126,0.85), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-[10%] bottom-[-20%] h-[52vmin] w-[52vmin] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, #00c2d9, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-[5%] md:px-8 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
            <LogoMark className="size-10" />
            <span className="flex items-baseline gap-2">
              <span className="font-display text-lg font-bold tracking-wide text-white">VELOCE</span>
              <span className="text-[9px] font-extrabold uppercase tracking-[0.34em] text-slate-500">
                Motors
              </span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm font-medium leading-relaxed text-slate-500">
            The electric luxury dealership. Six showrooms, one obsession: the
            quietest fast cars on Earth.
          </p>
          <span className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/70">
            <span className="pulse-dot size-2 rounded-full bg-neon" />
            All six showrooms open · Mon–Sat 9:00–19:00
          </span>
        </div>

        <nav aria-label="Models">
          <h4 className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-white/45">
            Models
          </h4>
          <ul className="mt-5 space-y-2.5">
            {CARS.map((car) => (
              <li key={car.id}>
                <a
                  href="#models"
                  className="text-sm font-semibold text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  {car.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Showroom">
          <h4 className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-white/45">
            Showroom
          </h4>
          <ul className="mt-5 space-y-2.5">
            {[
              ["The lineup", "#models"],
              ["Interiors", "#interiors"],
              ["Why Veloce", "#experience"],
              ["Owner reviews", "#reviews"],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm font-semibold text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={onBook}
                className="mt-1 inline-flex items-center gap-2 text-sm font-extrabold text-volt transition-colors duration-300 hover:text-white"
              >
                Book a test drive
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>

        <div>
          <h4 className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-white/45">
            The Charging Letter
          </h4>
          <p className="mt-5 text-sm font-medium leading-relaxed text-slate-500">
            One email a month: new arrivals, hypercharge map updates and
            owner-only drive days.
          </p>
          {joined ? (
            <p className="mt-4 flex items-center gap-2.5 rounded-xl border border-neon/30 bg-neon/10 px-4 py-3 text-sm font-bold text-neon">
              <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m4.5 12.5 5 5 10-11" />
              </svg>
              You're in — the first letter lands Friday.
            </p>
          ) : (
            <form onSubmit={onJoin} className="mt-4 flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@fastmail.com"
                className="w-full min-w-0 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-volt focus:bg-white/10"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-ampere px-6 text-sm font-extrabold text-white transition-colors duration-300 hover:bg-volt hover:text-ink"
              >
                Join
              </button>
            </form>
          )}
          <div className="mt-6 space-y-1.5 text-sm font-semibold">
            <a href="tel:+498912004040" className="block transition-colors hover:text-white">
              +49 89 1200 4040
            </a>
            <a href="mailto:hello@veloce-motors.eu" className="block transition-colors hover:text-white">
              hello@veloce-motors.eu
            </a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-16 flex max-w-[1280px] flex-wrap items-center justify-between gap-4 border-t border-white/10 px-[5%] pt-8 text-xs font-semibold text-slate-600 md:px-8">
        <span>© 2026 Veloce Motors GmbH · Munich</span>
        <span className="hidden md:block">Made for the road ahead.</span>
        <button
          onClick={toTop}
          aria-label="Back to top"
          className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-neon hover:text-neon"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
