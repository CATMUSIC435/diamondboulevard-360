import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { BackSide, SRGBColorSpace } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function PanoramaBox({ texturePaths, isActive }) {
  const textures = useTexture(texturePaths);
  const materialsRef = useRef([]);

  useMemo(() => {
    textures.forEach((tex) => {
      tex.colorSpace = SRGBColorSpace;
      tex.repeat.set(-1, 1);
      tex.offset.set(1, 0);
      tex.anisotropy = 2; // Giảm xuống 2 cho mobile mượt hơn nữa
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false; // Tối ưu GPU RAM
      tex.needsUpdate = true;
    });
  }, [textures]);

  useFrame((state, delta) => {
    // Fade in/out
    const targetOpacity = isActive ? 1 : 0;
    materialsRef.current.forEach((mat) => {
      if (mat) {
        THREE.MathUtils.damp(mat, "opacity", targetOpacity, 4, delta);
        // Tối ưu render: nếu opacity < 0.01 thì không render
        mat.visible = mat.opacity > 0.01;
      }
    });
  });

  return (
    <mesh renderOrder={-100}>
      <boxGeometry args={[1000, 1000, 1000]} />

      {textures.map((tex, i) => (
        <meshBasicMaterial
          key={i}
          ref={(el) => (materialsRef.current[i] = el)}
          map={tex}
          side={BackSide}
          toneMapped={false}
          color="#f0f0f0"
          attach={`material-${i}`}
          transparent={true} // Cho phép làm mờ chất liệu
          opacity={isActive ? 1 : 0} // Giá trị khởi tạo
          depthWrite={false} // Quan trọng: không chèn vào depth buffer để Hotspot luôn nổi trước
        />
      ))}
    </mesh>
  );
}
