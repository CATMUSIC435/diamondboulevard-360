import { useTexture } from "@react-three/drei";
import { useState, useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function HotspotDirection({ position, title, imageUrl, onClick }) {
  const [hovered, setHover] = useState(false);
  const spriteRef = useRef();
  
  const texture = useTexture(imageUrl);

  useLayoutEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      // Khử răng cưa cho chính texture của Sprite
      texture.anisotropy = 16;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.generateMipmaps = true;
      texture.needsUpdate = true;
    }
  }, [texture]);

  useFrame((state) => {
    if (spriteRef.current) {
      // 1. Hiệu ứng bay nhảy: Thay vì cộng dồn position[1], 
      // ta chỉ set giá trị sin vào vị trí tương đối.
      spriteRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.4;
      
      // 2. Xử lý scale mượt mà
      const targetScale = hovered ? 14 : 12;
      const s = THREE.MathUtils.lerp(spriteRef.current.scale.x, targetScale, 0.15);
      spriteRef.current.scale.set(s, s * 0.83, 1);

      // 3. QUAN TRỌNG: Ép ma trận cập nhật để dính chặt vào camera không có độ trễ
      spriteRef.current.updateMatrixWorld();
    }
  });

  return (
    // Group cha giữ vị trí tuyệt đối
    <group position={position}>
      
      {/* Vùng click: Đặt tại tâm 0 của group cha (chính là position truyền vào) */}
      <mesh 
        onClick={onClick}
        onPointerOver={() => {
          setHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[8, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Sprite nằm bên trong group đã có tọa độ position */}
      <sprite ref={spriteRef}>
        <spriteMaterial 
          map={texture} 
          transparent={true}
          opacity={hovered ? 1 : 0.8}
          toneMapped={false}
          // depthTest={false} // Bật cái này nếu muốn hotspot luôn hiện đè lên mọi thứ
          sizeAttenuation={true} // Giúp hotspot nhỏ lại khi zoom xa (tự nhiên hơn)
        />
      </sprite>
    </group>
  );
}