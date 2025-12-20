import { useTexture } from "@react-three/drei";
import { useLayoutEffect, memo } from "react";
import { BackSide, SRGBColorSpace, LinearMipmapLinearFilter, LinearFilter } from "three";
import { useThree } from "@react-three/fiber";

export const PanoramaBox = memo(function PanoramaBox({ texturePaths, isActive }) {
  const textures = useTexture(texturePaths);
  const { gl } = useThree();

  useLayoutEffect(() => {
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

    textures.forEach((tex) => {
      if (tex.userData.isConfigured) return;
      tex.colorSpace = SRGBColorSpace;
      
      tex.repeat.set(-1, 1);
      tex.offset.set(1, 0);

      // Tăng độ nét khi nhìn nghiêng (Quan trọng nhất)
      tex.anisotropy = maxAnisotropy; 

      // Bộ lọc tuyến tính (giữ chi tiết tốt)
      tex.magFilter = LinearFilter; 
      
      // Bộ lọc Mipmap (Khử răng cưa khi zoom xa/thu nhỏ)
      tex.minFilter = LinearMipmapLinearFilter; 
      tex.generateMipmaps = true; 

      // Đánh dấu đã xử lý xong để không bao giờ chạy lại đoạn này nữa
      tex.userData.isConfigured = true;
      tex.needsUpdate = true;
    });
  }, [textures, gl]);

  if (!isActive) return null;

  return (
    <mesh>
      <boxGeometry args={[1000, 1000, 1000]} />

      {textures.map((tex, i) => (
        <meshBasicMaterial
          key={tex.uuid} // Dùng UUID thay vì index để React định danh chính xác
          attach={`material-${i}`}
          map={tex}
          side={BackSide} // Render mặt trong
          toneMapped={false} // Tắt tone mapping để màu tươi, không bị xám
          color="#ffffff" // Màu trắng tinh khiết
        />
      ))}
    </mesh>
  );
});