import { useTexture } from "@react-three/drei";
import { BackSide, SRGBColorSpace } from "three";

export function PanoramaBox({texturePaths, isActive}) {
  const textures = useTexture(texturePaths);

  textures.forEach((tex) => {
    tex.colorSpace = SRGBColorSpace;

    // Lật ngang ảnh để chữ không bị ngược khi dùng BackSide
    tex.repeat.set(-1, 1);
    tex.offset.set(1, 0); // Quan trọng: Đẩy ảnh lại vị trí cũ sau khi lật

    tex.anisotropy = 16; // Giúp chữ sắc nét hơn
    tex.needsUpdate = true;
  });

  return (
    <mesh>
      {/* Box lớn hơn → zoom mượt */}
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
