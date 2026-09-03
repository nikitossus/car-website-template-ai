# Porsche 911 3D Car Website Template

A modern, interactive car showcase website featuring a **3D Porsche 911 model** that rotates as you scroll through the page. Built with React, Three.js, and Tailwind CSS.

![Preview](https://img.shields.io/badge/React-18.2-blue) ![Three.js-0.185-orange] ![Tailwind-4.1-cyan)

## ✨ Features

- **Interactive 3D Background**: Classic Porsche 911 model that rotates 360° as you scroll
- **Smooth Animations**: Subtle floating effect on the 3D model for extra engagement
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern Stack**: React 18, Three.js (via React Three Fiber), TypeScript, Tailwind CSS v4
- **Professional Lighting**: Studio-quality lighting setup with ambient, directional, and spot lights
- **Contact Shadows**: Realistic grounding shadows for the 3D model
- **Component Architecture**: Modular components for easy customization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-directory>

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173/` (or the port shown in your terminal).

### Build for Production

```bash
npm run build
```

Production files will be generated in the `dist/` directory.

## 📁 Project Structure

```
/workspace
├── src/
│   ├── App.tsx                 # Main app component with scroll tracking
│   ├── components/
│   │   ├── Porsche3DBackground.tsx  # 3D Porsche model component
│   │   ├── Nav.tsx             # Navigation bar
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Sections.tsx        # Content sections (Ticker, Featured, etc.)
│   │   ├── BookingModal.tsx    # Booking modal dialog
│   │   └── Footer.tsx          # Footer component
│   ├── data.ts                 # Content data
│   ├── index.css               # Global styles
│   ├── main.tsx                # Entry point
│   └── ui.tsx                  # UI utilities
├── dist/                       # Production build output
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.js              # Vite bundler configuration
```

## 🎨 Customization Guide

### Changing the 3D Model

Edit `src/components/Porsche3DBackground.tsx`:

```typescript
// Replace with your own GLTF/GLB model URL
const PORSCHE_MODEL_URL = "https://your-cdn.com/your-model.gltf";
```

**Supported formats**: `.gltf`, `.glb` (recommended for web)

You can find free/paid 3D models at:
- [Sketchfab](https://sketchfab.com/)
- [Poly Pizza](https://poly.pizza/)
- [Kenney Assets](https://kenney.nl/assets)

### Adjusting Model Properties

In `Porsche3DBackground.tsx`, modify the `<primitive>` component:

```tsx
<primitive 
  ref={carRef}
  object={scene.clone()} 
  scale={0.5}           // Adjust size
  position={[0, -0.5, 0]} // X, Y, Z position
  rotation={[0, 0, 0]}    // Initial rotation
/>
```

### Camera Position

Adjust the viewing angle in the `Scene` component:

```tsx
camera.position.set(0, 1, 4);  // X, Y, Z
camera.lookAt(0, 0.5, 0);       // Look at point
```

### Scroll Rotation Speed

Modify the rotation calculation in `PorscheModel`:

```tsx
// Current: Full 360° over entire page scroll
const rotationAngle = scrollProgress * Math.PI * 2;

// Slower: Half rotation
const rotationAngle = scrollProgress * Math.PI;

// Faster: Multiple rotations
const rotationAngle = scrollProgress * Math.PI * 4;
```

### Lighting Setup

Customize lighting in the `Scene` component:

```tsx
<ambientLight intensity={0.5} />
<directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
<spotLight position={[0, 5, -5]} intensity={1.0} angle={0.5} />
```

### Colors and Styling

The project uses Tailwind CSS v4. Edit `src/index.css` for custom styles or add utility classes directly in components.

## 🔧 Technical Details

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI framework |
| three | ^0.185.1 | 3D rendering engine |
| @react-three/fiber | ^9.7.0 | React renderer for Three.js |
| @react-three/drei | ^10.7.8 | Useful helpers for R3F |
| tailwindcss | ^4.1.7 | Utility-first CSS |
| typescript | ^5.7.0 | Type safety |
| framer-motion | ^11.16.1 | Animations |

### How Scroll Tracking Works

1. `App.tsx` listens to scroll events and calculates progress (0 to 1)
2. Progress is passed to `Porsche3DBackground` component
3. The 3D model's Y-rotation is set to `scrollProgress * 2π` (full circle)
4. `useFrame` hook updates rotation on every animation frame

### Performance Optimizations

- Model preloading with `useGLTF.preload()`
- Passive scroll listeners for better performance
- Device pixel ratio clamping (`dpr={[1, 2]}`)
- Antialiasing enabled for smooth edges
- Suspense for lazy loading 3D assets

## 🌐 Deployment

### Vercel

```bash
npm install -g vercel
vercel deploy
```

### Netlify

Connect your GitHub repo or drag & drop the `dist/` folder.

### Manual Hosting

Upload the contents of `dist/` to any static hosting service.

## 📝 License

This template is provided as-is for educational and commercial use.

**Note**: The 3D Porsche model is loaded from a public CDN. Ensure you have appropriate rights if using in production, or replace with your own licensed model.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using React + Three.js**
