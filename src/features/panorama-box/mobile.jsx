import { useTexture } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { BackSide, SRGBColorSpace, LinearFilter, MathUtils } from "three";
import { useFrame, useThree } from "@react-three/fiber";

export function PanoramaBoxMobile({ texturePaths, isActive }) {
  const textures = useTexture(texturePaths);
  const { gl } = useThree();
  
  const [isGPUReady, setIsGPUReady] = useState(false);
  const uploadIndex = useRef(0);
  
  const opacityRef = useRef(0);
  const materialsRef = useRef([]);
  const meshRef = useRef(); // Thêm ref cho mesh để ẩn/hiện mượt

  useEffect(() => {
    if (textures) {
      textures.forEach((tex) => {
        tex.colorSpace = SRGBColorSpace;
        tex.repeat.set(-1, 1);
        tex.offset.set(1, 0);
        tex.anisotropy = 2; 
        tex.minFilter = LinearFilter;
        tex.generateMipmaps = false;
      });
    }
  }, [textures]);

  useFrame((state, delta) => {
    // 1. Logic Nạp GPU (giữ nguyên)
    if (!isGPUReady && textures) {
      const shouldUpload = isActive || state.clock.getElapsedTime() > 1.0; 
      if (shouldUpload && uploadIndex.current < textures.length) {
        gl.initTexture(textures[uploadIndex.current]);
        uploadIndex.current += 1;
      } else if (uploadIndex.current >= textures.length) {
        setIsGPUReady(true);
      }
    }

    // 2. Điều khiển Opacity và Visibility
    const targetOpacity = (isActive && isGPUReady) ? 1 : 0;
    
    if (Math.abs(opacityRef.current - targetOpacity) > 0.001) {
      opacityRef.current = MathUtils.lerp(
        opacityRef.current, 
        targetOpacity, 
        isActive ? 0.1 : 0.15 // Tốc độ fade out mượt
      );

      // Cập nhật trực tiếp vào material
      materialsRef.current.forEach(mat => {
        if (mat) mat.opacity = opacityRef.current;
      });

      // Chỉ hiển thị Mesh khi opacity > 0
      if (meshRef.current) {
        meshRef.current.visible = opacityRef.current > 0.001;
      }
    } else {
      if (!isActive && meshRef.current) {
        meshRef.current.visible = false;
      }
    }
  });
  
  if (!textures) return null;

  return (
    <mesh ref={meshRef} visible={false}> 
      <boxGeometry args={[1000, 1000, 1000]} />
      {textures.map((tex, i) => (
        <meshBasicMaterial
          key={i}
          ref={(el) => (materialsRef.current[i] = el)}
          map={tex}
          side={BackSide}
          attach={`material-${i}`}
          transparent={true}
          opacity={0}
          toneMapped={false}
          depthWrite={false}
        />
      ))}
    </mesh>
  );
}