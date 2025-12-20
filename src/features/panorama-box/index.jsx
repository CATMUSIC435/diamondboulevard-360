import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { BackSide, SRGBColorSpace, LinearMipmapLinearFilter, LinearFilter } from "three";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export function PanoramaBox({texturePaths, isActive}) {
const textures = useTexture(texturePaths);
  const { gl } = useThree();

  useMemo(() => {
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

    textures.forEach((tex) => {
      tex.colorSpace = SRGBColorSpace;
      
      tex.repeat.set(-1, 1);
      tex.offset.set(1, 0);

      // --- Cấu hình tăng độ sắc nét ---
      tex.anisotropy = maxAnisotropy;
      
      tex.magFilter = LinearFilter; 
      
      tex.minFilter = LinearMipmapLinearFilter; 
      
      tex.generateMipmaps = true;

      tex.needsUpdate = true;
    });
  }, [textures, gl]);

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
