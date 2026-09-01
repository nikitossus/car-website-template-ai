import { useCallback, useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import Porsche3DBackground from "./components/Porsche3DBackground";
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
  const [scrollProgress, setScrollProgress] = useState(0);

  const openBooking = useCallback(
    (model: string | null = null) => setBooking({ open: true, model }),
    [],
  );
  const closeBooking = useCallback(
    () => setBooking((b) => ({ ...b, open: false })),
    [],
  );

  // Track scroll progress for 3D model rotation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-paper font-body text-ink">
      {/* 3D Porsche background */}
      <div className="fixed inset-0 z-0">
        <Porsche3DBackground scrollProgress={scrollProgress} />
      </div>
      
      <Nav onBook={() => openBooking(null)} />
      <main className="relative z-10">
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
