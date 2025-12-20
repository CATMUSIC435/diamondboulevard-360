import { useTexture } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { BackSide, SRGBColorSpace, LinearFilter, MathUtils } from "three";
import { useFrame, useThree } from "@react-three/fiber";

export function PanoramaBoxMobile({ texturePaths, isActive }) {
  // 1. Nạp texture (Drei useTexture đã tự động cache file)
  const textures = useTexture(texturePaths);
  const { gl } = useThree();
  
  const [opacity, setOpacity] = useState(0);
  const [isGPUReady, setIsGPUReady] = useState(false);
  const uploadIndex = useRef(0);
  const isStarted = useRef(false);

  // 2. Cấu hình kỹ thuật cho Texture
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
    if (!isGPUReady && textures) {
      const shouldUpload = isActive || state.clock.getElapsedTime() > 1.0; 

      if (shouldUpload && uploadIndex.current < textures.length) {
        gl.initTexture(textures[uploadIndex.current]);
        uploadIndex.current += 1;
      } else if (uploadIndex.current >= textures.length) {
        setIsGPUReady(true);
      }
    }

    if (isActive && isGPUReady) {
      setOpacity((prev) => MathUtils.lerp(prev, 1, 0.1));
    } else {
      if (opacity > 0) setOpacity((prev) => MathUtils.lerp(prev, 0, 0.2));
    }
  });

  if (!isActive && !isGPUReady) return null;

  return (
    <mesh visible={opacity > 0.01}>
      <boxGeometry args={[1000, 1000, 1000]} />
      {textures.map((tex, i) => (
        <meshBasicMaterial
          key={i}
          map={tex}
          side={BackSide}
          attach={`material-${i}`}
          transparent={true}
          opacity={opacity}
          toneMapped={false}
          depthWrite={false}
        />
      ))}
    </mesh>
  );
}