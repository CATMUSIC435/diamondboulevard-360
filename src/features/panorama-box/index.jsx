import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { BackSide } from "three";
import * as THREE from "three";

export function PanoramaBox({texturePaths, isActive}) {
const textures = useTexture(texturePaths);
  const { gl } = useThree();

  useMemo(() => {
    // Lấy khả năng khử cực tối đa của thiết bị (thường là 16)
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.repeat.set(-1, 1);
      tex.offset.set(1, 0);

      // --- TỐI ƯU KHỬ RĂNG CƯA TẠI ĐÂY ---
      tex.anisotropy = maxAnisotropy; // Tăng từ 2 lên 16 để nét khi nhìn nghiêng
      
      // MagFilter dùng Linear là đủ nét
      tex.magFilter = THREE.LinearFilter; 
      
      // Dùng Mipmap giúp khử răng cưa khi thu nhỏ/zoom xa cực tốt và mượt
      tex.minFilter = THREE.LinearMipmapLinearFilter; 
      tex.generateMipmaps = true; 
      // ---------------------------------
      
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
          transparent={true}
          opacity={isActive ? 1 : 0}
        />
      ))}
    </mesh>
  );
}
