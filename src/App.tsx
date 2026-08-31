import { useCallback, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import {
  CtaBand,
  Experience,
  Featured,
  Interiors,
  Testimonials,
  Ticker,
} from "./components/Sections";

export default function App() {
  const [booking, setBooking] = useState<{ open: boolean; model: string | null }>(
    { open: false, model: null },
  );

  const openBooking = useCallback(
    (model: string | null = null) => setBooking({ open: true, model }),
    [],
  );
  const closeBooking = useCallback(
    () => setBooking((b) => ({ ...b, open: false })),
    [],
  );

  return (
    <div className="relative min-h-screen bg-paper font-body text-ink">
      <Nav onBook={() => openBooking(null)} />
      <main>
        <Hero onBook={openBooking} />
        <Ticker />
        <Featured onBook={openBooking} />
        <Interiors />
        <Experience />
        <Testimonials />
        <CtaBand onBook={() => openBooking(null)} />
      </main>
      <Footer onBook={() => openBooking(null)} />
      <BookingModal open={booking.open} model={booking.model} onClose={closeBooking} />
    </div>
  );
}
