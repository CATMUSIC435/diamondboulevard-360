import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3, MathUtils } from "three";
import { useState, useMemo, useRef } from "react";
import { OptimizedHotspot } from "./optimized-hotspot";

export function Hotspot({ position, text, distance = 60, lineHeight = 50, bg = "#002d4d" }) {
  const [hovered, setHover] = useState(false);
  
  const groupRef = useRef();
  const contentRef = useRef();
  const lineRef = useRef();
  const baseRef = useRef();

  const v1 = useMemo(() => new Vector3(), []);
  const v2 = useMemo(() => new Vector3(), []);
  
  const baseScale = useMemo(() => distance / 60, [distance]);

  useFrame((state) => {
    if (!groupRef.current || !contentRef.current || !lineRef.current || !baseRef.current) return;

    // 1. Lấy vị trí thế giới và hướng nhìn camera
    groupRef.current.getWorldPosition(v1);
    state.camera.getWorldDirection(v2);
    
    // 2. Tính toán Vector hướng từ Camera đến Hotspot
    const dirToSpot = v1.clone().sub(state.camera.position).normalize();
    const dot = v2.dot(dirToSpot);
    
    // 3. TÍNH TOÁN NGƯỠNG DOT ĐỘNG THEO FOV
    // Khi zoom out (fov lớn), ngưỡng dot cần nhỏ đi để hiện hotspot ở rìa
    // Khi zoom in (fov nhỏ), ngưỡng dot cần lớn hơn (gần 1)
    const fovRad = (state.camera.fov * Math.PI) / 180;
    
    // Ngưỡng xuất hiện dựa trên cosin của nửa góc nhìn. 
    // Nhân thêm 0.8 để hotspot hiện sớm một chút trước khi vào hẳn khung hình.
    const threshold = Math.cos(fovRad / 2) * 0.8; 

    const inView = dot > threshold; 

    // 4. Cập nhật Scale cho Content và Base
    const targetScale = inView ? baseScale : 0;
    contentRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
    const finalBaseScale = (inView ? baseScale : 0) * pulse * 1.5; 
    baseRef.current.scale.lerp(new Vector3(finalBaseScale, finalBaseScale, finalBaseScale), 0.1);

    // 5. Cập nhật Opacity
    const targetLineOpacity = inView ? 0.6 : 0;
    lineRef.current.material.opacity = MathUtils.lerp(lineRef.current.material.opacity, targetLineOpacity, 0.1);
    
    baseRef.current.material.opacity = MathUtils.lerp(baseRef.current.material.opacity, inView ? 0.8 : 0, 0.1);
  });

  const startPoint = useMemo(() => new Vector3(0, 0, 0), []);
  const endPoint = useMemo(() => new Vector3(0, lineHeight, 0), [lineHeight]);

  return (
    <group 
      ref={groupRef}
      position={position} 
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh ref={baseRef} scale={[baseScale, baseScale, baseScale]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#002d4d" : "#fff"} transparent opacity={0.8} />
      </mesh>

      <Line
        ref={lineRef}
        points={[startPoint, endPoint]} 
        color={hovered ? "#002d4d" : "#fff"}
        lineWidth={1.5 * baseScale}
        transparent
        opacity={0}
      />

      <group ref={contentRef} position={endPoint} scale={[0, 0, 0]}>
         <OptimizedHotspot text={text} bg={bg} />
      </group>
    </group>
  );
}