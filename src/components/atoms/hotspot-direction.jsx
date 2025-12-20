import { Billboard, Image } from "@react-three/drei";
import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function HotspotDirection({ position, title, imageUrl, onClick }) {
  const [hovered, setHover] = useState(false);
  const groupRef = useRef();

  const imgWidth = 10;
  const imgHeight = 8;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 1;
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position}
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
      <mesh visible={false}>
        <sphereGeometry args={[15, 16, 16]} />
      </mesh>

      <Billboard>
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[imgWidth + 1, imgHeight + 1]} />
          <meshBasicMaterial 
            color="white" 
            transparent 
            opacity={0} 
          />
        </mesh>

        {/* 3. HÌNH ẢNH NHỎ GỌN */}
        <Image 
          url={imageUrl} 
          transparent
          // Bo góc một chút cho hiện đại
          borderRadius={0.2}
          opacity={hovered ? 1 : 0.8}
          // Scale nhỏ lại: Hover [15.4, 11], Bình thường [14, 10]
          scale={hovered ? [imgWidth * 1.1, imgHeight * 1.1] : [imgWidth, imgHeight]}
          position={[0, 0, 0.1]}
        />

      </Billboard>
    </group>
  );
}