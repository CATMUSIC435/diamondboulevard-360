import { useTexture } from "@react-three/drei";
import { useMemo, useEffect, useState } from "react";
import { BackSide, SRGBColorSpace, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";

export function PanoramaBoxMobile({ texturePaths, isActive }) {
  const textures = useTexture(texturePaths);
  const [ready, setReady] = useState(false);

  // 1. Cấu hình Texture
  useMemo(() => {
    textures.forEach((tex) => {
      tex.colorSpace = SRGBColorSpace;
      tex.repeat.set(-1, 1);
      tex.offset.set(1, 0);
      tex.anisotropy = 4; // Mobile nên để 4 hoặc 8 để tránh lag
      tex.needsUpdate = true;
    });
  }, [textures]);

  // 2. Hiệu ứng Fade-in mượt mà sau khi thực sự sẵn sàng
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    if (isActive) {
      // Giả lập một khoảng nghỉ cực ngắn để GPU ổn định
      const timer = setTimeout(() => setReady(true), 100);
      return () => clearTimeout(timer);
    } else {
      setReady(false);
      setOpacity(0);
    }
  }, [isActive]);

  useFrame(() => {
    if (ready && opacity < 1) {
      setOpacity(prev => MathUtils.lerp(prev, 1, 0.05));
    }
  });

  return (
    <mesh>
      <boxGeometry args={[1000, 1000, 1000]} />
      {textures.map((tex, i) => (
        <meshBasicMaterial
          key={i}
          map={tex}
          side={BackSide}
          toneMapped={false}
          attach={`material-${i}`}
          transparent={true}
          opacity={opacity} // Fade in từ 0 lên 1
          color="white"     // Đổi từ #f0f0f0 sang white để ảnh đúng màu
          depthTest={isActive} // Tắt depth test cho scene ẩn để tiết kiệm tài nguyên
        />
      ))}
    </mesh>
  );
}