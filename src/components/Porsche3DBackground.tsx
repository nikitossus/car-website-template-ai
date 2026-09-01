import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Using a publicly available 3D model of a classic Porsche 911
// This is a low-poly model suitable for web display
const PORSCHE_MODEL_URL = "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/porsche-911/model.gltf";

function PorscheModel({ scrollProgress }: { scrollProgress: number }) {
  const carRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(PORSCHE_MODEL_URL);

  useFrame(() => {
    if (carRef.current) {
      // Rotate the car based on scroll progress
      // Full 360 degree rotation over the entire page scroll
      const rotationAngle = scrollProgress * Math.PI * 2;
      carRef.current.rotation.y = rotationAngle;
      
      // Add subtle floating animation
      carRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <primitive 
      ref={carRef}
      object={scene.clone()} 
      scale={0.5}
      position={[0, -0.5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useEffect(() => {
    // Set up camera position for a good viewing angle
    camera.position.set(0, 1, 4);
    camera.lookAt(0, 0.5, 0);
  }, [camera]);

  return (
    <>
      {/* Porsche 3D model */}
      <PorscheModel scrollProgress={scrollProgress} />
      
      {/* Studio lighting environment */}
      <Environment preset="studio" />
      
      {/* Ambient lighting for overall illumination */}
      <ambientLight intensity={0.5} />
      
      {/* Main directional light (key light) */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.5}
        castShadow
      />
      
      {/* Fill light from the opposite side */}
      <directionalLight 
        position={[-5, 3, -5]} 
        intensity={0.8}
      />
      
      {/* Rim light for edge definition */}
      <spotLight 
        position={[0, 5, -5]} 
        intensity={1.0}
        angle={0.5}
        penumbra={0.5}
      />
      
      {/* Contact shadows for grounding */}
      <ContactShadows 
        position={[0, -1, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={4} 
      />
    </>
  );
}

export default function Porsche3DBackground({ scrollProgress }: { scrollProgress: number }) {
  return (
    <Canvas
      camera={{ fov: 45, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(PORSCHE_MODEL_URL);
