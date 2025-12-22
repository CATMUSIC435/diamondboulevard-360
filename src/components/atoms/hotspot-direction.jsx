import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Billboard, useCursor } from "@react-three/drei";

export function HotspotDirection({ position, size = 0.5, onClick, color = "#00ffcc" }) {
  const [hovered, setHover] = useState(false);
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const coreRef = useRef();

  const BASE_RADIUS = 8 * size;
  const RING_THICKNESS = 2 * size;
  const RING_EXPANSION = 2;
  const CLICK_ZONE = 12 * size;
  const PULSE_SPEED = 2;

  const coreColor = "#00aaff"; 

  useCursor(hovered, /*'pointer', 'auto', document.body*/)
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * PULSE_SPEED;

    if (coreRef.current) {
      const s = 1 + Math.sin(t * 2.5) * 0.15;
      coreRef.current.scale.set(s, s, s);
    }

    const animateRing = (ref, delay) => {
      if (ref.current) {
        const progress = (t / 2 + delay) % 1;
        // Scale vòng nháy dựa trên tỉ lệ progress
        const s = 1 + progress * RING_EXPANSION;
        ref.current.scale.set(s, s, s);
        ref.current.material.opacity = (1 - progress) * 0.9;
      }
    };

    animateRing(ring1, 0);
    animateRing(ring2, 0.33);
    animateRing(ring3, 0.66);
  });

  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerOver={() => {
          setHover(true);
        }}
        onPointerOut={() => {
          setHover(false);
        }}
      >
        <sphereGeometry args={[CLICK_ZONE, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <Billboard>
        <mesh ref={coreRef} scale={hovered ? 1.3 : 1}>
          <circleGeometry args={[BASE_RADIUS, 32]} />
          <meshBasicMaterial 
            color={coreColor} 
            transparent 
            opacity={1} 
            toneMapped={false} 
          />
        </mesh>

        {/* Hào quang bám sát lõi */}
        <mesh scale={[1.1, 1.1, 1]}>
          <circleGeometry args={[BASE_RADIUS, 32]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.4} 
            blending={THREE.AdditiveBlending} 
            toneMapped={false} 
          />
        </mesh>

        {[ring1, ring2, ring3].map((ref, index) => (
          <mesh key={index} ref={ref}>
            <ringGeometry args={[BASE_RADIUS, BASE_RADIUS + RING_THICKNESS, 64]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              toneMapped={false} 
              blending={THREE.AdditiveBlending} 
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </Billboard>
    </group>
  );
}
