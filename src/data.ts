export type Car = {
  id: string;
  name: string;
  type: string;
  headline: string;
  tagline: string;
  price: string;
  range: number;
  accel: string;
  top: number;
  accent: string;
  chipFg: string;
  image: string;
};

export const CARS: Car[] = [
  {
    id: "velara",
    name: "Velara GT",
    type: "Electric Hyper-GT",
    headline: "Silence, at 320 km/h.",
    tagline:
      "A tri-motor electric grand tourer with a chassis tuned on the Nordschleife and a cabin that floats above it.",
    price: "€218,000",
    range: 640,
    accel: "2.4",
    top: 320,
    accent: "#00c2d9",
    chipFg: "#0a1526",
    image:
      "https://image.qwenlm.ai/generated-images/20982937-5bcd-447e-8b6b-908e8232cf25/_result.png",
  },
  {
    id: "aeron",
    name: "Aeron X",
    type: "Performance SUV",
    headline: "Room for everything. Compromise for nothing.",
    tagline:
      "Seven seats, adaptive air suspension and 800 volts — the family hauler just went hyper.",
    price: "€124,500",
    range: 720,
    accel: "3.8",
    top: 250,
    accent: "#0b6bff",
    chipFg: "#ffffff",
    image:
      "https://image.qwenlm.ai/generated-images/f98da3d2-8acd-4634-9a08-6718f7518694/_result.png",
  },
  {
    id: "orbit",
    name: "Orbit S",
    type: "Sport Coupe",
    headline: "Born in the wind tunnel.",
    tagline:
      "Active aero, rear-wheel steer and a cockpit that wraps around you like a racing suit.",
    price: "€96,900",
    range: 580,
    accel: "3.1",
    top: 280,
    accent: "#29e07e",
    chipFg: "#0a1526",
    image:
      "https://image.qwenlm.ai/generated-images/41289008-7cca-40b8-acad-29cbffe4e22d/_result.png",
  },
  {
    id: "nova",
    name: "Nova City",
    type: "Urban Hatch",
    headline: "The city, unlocked.",
    tagline: "A 420 km bubble of calm that parks itself.",
    price: "€39,900",
    range: 420,
    accel: "6.9",
    top: 180,
    accent: "#00c2d9",
    chipFg: "#0a1526",
    image:
      "https://image.qwenlm.ai/generated-images/41b9a117-5658-417a-a346-859f5bf391d9/_result.png",
  },
  {
    id: "pulse",
    name: "Pulse S",
    type: "Executive Sedan",
    headline: "Arrive already rested.",
    tagline: "Massage seats, 660 km of hush, zero road noise.",
    price: "€72,400",
    range: 660,
    accel: "4.6",
    top: 230,
    accent: "#0b6bff",
    chipFg: "#ffffff",
    image:
      "https://image.qwenlm.ai/generated-images/72978aa5-e1ef-4833-b225-e269ce60200a/_result.png",
  },
  {
    id: "terra",
    name: "Terra 4X",
    type: "Adventure SUV",
    headline: "Grid optional.",
    tagline: "540 km of range, 900 mm of wading, no excuses.",
    price: "€88,000",
    range: 540,
    accel: "5.2",
    top: 200,
    accent: "#29e07e",
    chipFg: "#0a1526",
    image:
      "https://image.qwenlm.ai/generated-images/aa53cbb9-8d3e-4a51-9e1c-a6722dc58e05/_result.png",
  },
];

export const HERO_SLIDES = CARS.slice(0, 3);

export type Interior = {
  id: string;
  model: string;
  title: string;
  copy: string;
  image: string;
};

export const INTERIORS: Interior[] = [
  {
    id: "int-velara",
    model: "Velara GT",
    title: "The Air Lounge",
    copy: "Vegan microfiber, a 32-inch curved horizon display and ambient light that reads your heart rate.",
    image:
      "https://image.qwenlm.ai/generated-images/0d5bd10f-b665-4d72-b628-e4de7bf3dc44/_result.png",
  },
  {
    id: "int-aeron",
    model: "Aeron X",
    title: "First class, every row",
    copy: "Heated captain chairs in all three rows, a chilled console and a roof that turns to sky.",
    image:
      "https://image.qwenlm.ai/generated-images/4fc6215d-18fd-4754-b495-8e17cabbb48e/_result.png",
  },
  {
    id: "int-orbit",
    model: "Orbit S",
    title: "The Cockpit",
    copy: "Carbon, Alcantara and a neon thread that pulses in sync with the drivetrain's torque.",
    image:
      "https://image.qwenlm.ai/generated-images/b29c2e7c-91a3-43f7-8e27-9beaddaf3f49/_result.png",
  },
];

export const STATS = [
  {
    value: 12480,
    suffix: "+",
    decimals: 0,
    label: "Cars delivered",
    sub: "since 2014, all-electric",
    color: "#29e07e",
    dark: true,
  },
  {
    value: 98,
    suffix: "%",
    decimals: 0,
    label: "Would recommend",
    sub: "verified owner survey",
    color: "#00c2d9",
    dark: false,
  },
  {
    value: 420,
    suffix: "+",
    decimals: 0,
    label: "Hypercharge partners",
    sub: "350 kW pillars across Europe",
    color: "#0b6bff",
    dark: false,
  },
  {
    value: 4.9,
    suffix: "/5",
    decimals: 1,
    label: "Average rating",
    sub: "14,200 published reviews",
    color: "#00c2d9",
    dark: false,
  },
];

export type Feature = {
  icon: "bolt" | "battery" | "wheel" | "shield";
  title: string;
  copy: string;
  color: string;
};

export const FEATURES: Feature[] = [
  {
    icon: "bolt",
    title: "800V Hypercharge",
    copy: "10–80% in 18 minutes on any Veloce partner pillar. Coffee-length stops, continent-length trips.",
    color: "#0b6bff",
  },
  {
    icon: "battery",
    title: "Solid-state range",
    copy: "Up to 780 km WLTP with real-time thermal pre-conditioning that guards every kilometer.",
    color: "#00c2d9",
  },
  {
    icon: "wheel",
    title: "Level-3 Autopilot",
    copy: "Certified hands-free driving on the Autobahn — insured by us, updated over the air.",
    color: "#29e07e",
  },
  {
    icon: "shield",
    title: "The 8-year promise",
    copy: "Battery, drivetrain and paint covered for 8 years or 200,000 km. Transferable, no fine print.",
    color: "#0b6bff",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  car: string;
  rating: number;
  accent: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I drove the Velara home through the Alps on a single charge and arrived with 30% left. My old V8 sits in the garage like a museum piece.",
    name: "Maren Holt",
    role: "Architect · Munich",
    car: "Velara GT",
    rating: 5,
    accent: "#00c2d9",
  },
  {
    quote:
      "Two kids, two dogs, 900 km to the coast. The Aeron did it in near silence — and the charging stops were coffee-length, not lunch-length.",
    name: "Jonas & Petra Keller",
    role: "Family of four · Hamburg",
    car: "Aeron X",
    rating: 5,
    accent: "#0b6bff",
  },
  {
    quote:
      "The Orbit is the first EV that made me laugh out loud at a roundabout. Rear-wheel steer is absolute witchcraft.",
    name: "Tomás Ried",
    role: "Product designer · Berlin",
    car: "Orbit S",
    rating: 5,
    accent: "#29e07e",
  },
  {
    quote:
      "Booking took three minutes, and the Nova was charged and waiting with my name on the dash. Easiest car purchase of my life.",
    name: "Aisha Bello",
    role: "Pediatric nurse · Cologne",
    car: "Nova City",
    rating: 4,
    accent: "#00c2d9",
  },
];

export const TICKER_ITEMS = [
  "800V Hypercharge",
  "0–100 km/h in 2.4 s",
  "Up to 780 km range",
  "Level-3 Autopilot",
  "OTA updates for life",
  "5★ Euro NCAP",
  "Recycled-aluminium body",
  "6 showrooms across Europe",
];

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Models", href: "#models" },
  { label: "Interiors", href: "#interiors" },
  { label: "Experience", href: "#experience" },
  { label: "Owners", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const SHOWROOMS = [
  "Munich — Lenbachplatz",
  "Berlin — Kurfürstendamm",
  "Hamburg — Hafencity",
  "Stuttgart — Königsbau",
  "Vienna — Ringstraße",
  "Zurich — Paradeplatz",
];

export const TIME_SLOTS = ["10:00", "12:00", "14:30", "16:30", "18:00"];
