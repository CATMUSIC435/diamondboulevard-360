import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GlowRings({ color = "#ffffff", speed = 2, scaleMax = 4 }) {
  const groupRef = useRef();
  
  const ringGeo = useMemo(() => new THREE.RingGeometry(0.48, 0.5, 32), []);

  const materials = useMemo(() => 
    [0, 1, 2].map(() => new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).multiplyScalar(2),
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false, 
    })), [color]
  );

  useFrame((state) => {
    const elapsedTime = state.clock.elapsedTime;

    groupRef.current.children.forEach((mesh, i) => {
      const delay = i * (speed / 3);
      const t = (elapsedTime + delay) % speed;
      const progress = t / speed; // 0 -> 1

      const currentScale = progress * scaleMax;
      mesh.scale.set(currentScale, currentScale, 1);

      mesh.material.opacity = (1 - progress) * 0.8;
    });
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} geometry={ringGeo} material={materials[i]} />
      ))}
    </group>
  );
}
