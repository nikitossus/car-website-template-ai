import { useEffect, useState, type FormEvent } from "react";
import { CARS, SHOWROOMS, TIME_SLOTS } from "../data";

type Props = {
  open: boolean;
  model: string | null;
  onClose: () => void;
};

const inputCls =
  "w-full rounded-xl border border-cloud bg-mist/70 px-4 py-3 text-sm font-semibold text-ink outline-none transition-all duration-300 focus:border-ampere focus:bg-white focus:ring-4 focus:ring-ampere/10";
const labelCls =
  "mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400";

export default function BookingModal({ open, model, onClose }: Props) {
  const [done, setDone] = useState(false);
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [name, setName] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    if (open) {
      setDone(false);
      setTime(TIME_SLOTS[0]);
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [open, model]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const today = new Date().toISOString().slice(0, 10);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto p-4 md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Book a test drive"
    >
      <div
        className="anim-fade fixed inset-0 bg-ink/55 backdrop-blur-[6px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="pop-in relative my-8 w-full max-w-xl rounded-[1.6rem] bg-white p-7 shadow-[0_50px_120px_-30px_rgba(7,15,29,0.55)] md:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cloud bg-mist px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
              <span className="pulse-dot size-1.5 rounded-full bg-neon" />
              Veloce experience
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
              Book your test drive.
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-cloud text-slate-500 transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {done ? (
          <div className="anim-fade py-8 text-center">
            <svg viewBox="0 0 72 72" className="mx-auto size-20" fill="none" aria-hidden="true">
              <circle cx="36" cy="36" r="30" stroke="#00c2d9" strokeWidth="3.5" strokeLinecap="round" className="check-circle" />
              <path
                d="M23 37.5 32 46l17-19"
                stroke="#29e07e"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="check-path"
              />
            </svg>
            <h4 className="mt-6 font-display text-xl font-bold text-ink">
              You're on the road{name ? `, ${name.split(" ")[0]}` : ""}.
            </h4>
            <p className="mx-auto mt-2 max-w-sm text-sm font-medium leading-relaxed text-slate-500">
              We've reserved your {model ?? CARS[0].name} for {date} at {time}.
              A Veloce specialist will confirm by email within the hour.
            </p>
            <button
              onClick={onClose}
              className="mt-7 rounded-full bg-ink px-7 py-3 text-sm font-extrabold text-white transition-colors duration-300 hover:bg-ampere"
            >
              Back to the showroom
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-7 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bk-name" className={labelCls}>
                Full name
              </label>
              <input
                id="bk-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="bk-email" className={labelCls}>
                Email
              </label>
              <input
                id="bk-email"
                type="email"
                required
                placeholder="alex@studio.de"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="bk-model" className={labelCls}>
                Model
              </label>
              <select id="bk-model" key={model ?? "default"} defaultValue={model ?? CARS[0].name} className={inputCls}>
                {CARS.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} · from {c.price}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bk-showroom" className={labelCls}>
                Showroom
              </label>
              <select id="bk-showroom" className={inputCls} defaultValue={SHOWROOMS[0]}>
                {SHOWROOMS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="bk-date" className={labelCls}>
                Date
              </label>
              <input
                id="bk-date"
                type="date"
                required
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <span className={labelCls}>Preferred time</span>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    aria-pressed={time === t}
                    className={`rounded-full border px-4 py-2 text-xs font-extrabold tabular-nums transition-all duration-300 ${
                      time === t
                        ? "border-ink bg-ink text-white shadow-md"
                        : "border-cloud bg-mist/60 text-slate-500 hover:border-ink hover:text-ink"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 rounded-xl bg-ampere py-4 text-sm font-extrabold text-white shadow-[0_16px_36px_-12px_rgba(11,107,255,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink sm:col-span-2"
            >
              Reserve my drive — it's free
            </button>
            <p className="text-center text-[11px] font-semibold text-slate-400 sm:col-span-2">
              Free · 30 minutes · includes a hypercharge demo
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
