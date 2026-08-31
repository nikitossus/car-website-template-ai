import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data";
import { LogoMark } from "../ui";

export default function Nav({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-cloud bg-white/85 shadow-[0_10px_36px_-22px_rgba(10,21,38,0.35)] backdrop-blur-xl"
          : "border-b border-white/50 bg-white/30 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-[5%] md:h-[72px] md:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Veloce Motors — home">
          <LogoMark className="size-9 transition-transform duration-300 group-hover:translate-x-0.5" />
          <span className="flex items-baseline gap-2">
            <span className="font-display text-[17px] font-bold tracking-wide text-ink">
              VELOCE
            </span>
            <span className="hidden text-[9px] font-extrabold uppercase tracking-[0.34em] text-slate-400 sm:block">
              Motors
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-bold text-slate-500 transition-colors duration-300 hover:text-ink"
            >
              {l.label}
              <span className="absolute -bottom-1.5 inset-x-0 h-[2px] origin-left scale-x-0 rounded-full bg-ampere transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+498912004040"
            className="hidden items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-ink xl:flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </svg>
            +49 89 1200 4040
          </a>
          <button
            onClick={onBook}
            className="hidden items-center gap-2 rounded-full bg-ampere px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_10px_26px_-10px_rgba(11,107,255,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink sm:inline-flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M13 2.5 5.5 13H11l-1.5 8.5L17 11h-5.5l1.5-8.5z" />
            </svg>
            Book Test Drive
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex size-10 flex-col items-center justify-center gap-[5px] rounded-full border border-cloud bg-white/70 lg:hidden"
          >
            <span
              className={`h-[2px] w-4 rounded-full bg-ink transition-all duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-4 rounded-full bg-ink transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-4 rounded-full bg-ink transition-all duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-b border-cloud bg-white/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-[5%] py-5" aria-label="Mobile">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-mist py-3.5 text-base font-bold text-ink transition-colors hover:text-ampere"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onBook();
            }}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-ampere px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-ink"
          >
            Book Test Drive
          </button>
        </nav>
      </div>
    </header>
  );
}
