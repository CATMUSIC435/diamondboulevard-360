import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { BackSide, SRGBColorSpace } from "three";
import * as THREE from "three";

export function PanoramaBox({texturePaths, isActive}) {
  const textures = useTexture(texturePaths);

  useMemo(() => {
  textures.forEach((tex) => {
      tex.colorSpace = SRGBColorSpace;
      tex.repeat.set(-1, 1);
      tex.offset.set(1, 0);
      tex.anisotropy = 2; // Giảm xuống 2 cho mobile mượt hơn nữa
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
  });
  }, [textures]);

  return (
    <mesh>
      <boxGeometry args={[1000, 1000, 1000]} />

      {textures.map((tex, i) => (
        <meshBasicMaterial
          key={i}
          map={tex}
          side={BackSide}
          toneMapped={false}
          color="#f0f0f0"
          attach={`material-${i}`}
          opacity={isActive ? 1 : 0}
        />
      ))}
    </mesh>
  );
}
