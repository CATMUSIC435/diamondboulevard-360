import { Billboard, Html, Line } from "@react-three/drei";
import { DoubleSide, Vector3 } from "three";
import { useState, useMemo } from "react";
import { cn } from "../../lib/utils";

export function Hotspot({ position, text, distance = 60, lineHeight = 50, line = 1 }) {
  const [hovered, setHover] = useState(false);

  const handlePointerOver = () => {
    setHover(true);
  };

  
  const startPoint = useMemo(() => new Vector3(0, 0, 0), []);
  
  const endPoint = useMemo(() => new Vector3(0, lineHeight, 0), [lineHeight]);

  return (
    <group position={position} onPointerOver={handlePointerOver} onPointerOut={() => setHover(false)}  onClick={() => {
        alert(position);
      }}>
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color={hovered ? "#fff" : "#002d4d"} 
          transparent 
          opacity={1}
          side={DoubleSide}
        />
      </mesh>

      <Line
        points={[startPoint, endPoint]} 
        color={hovered ? "red" : "#002d4d"}
        lineWidth={1.5}
        transparent
        opacity={0.6}
      />
      <Billboard position={endPoint}>
        <Html center distanceFactor={distance}>
          <div 
            className={cn(`flex flex-col items-center transition-all duration-300 pointer-events-none`, line === 1 ? 'pb-24' : 'pb-48')}
          >
            <div 
              className={`bg-[#002d4d]/40 backdrop-blur-xl border-4 border-[#002d4d]/20 shadow-2xl rounded-full px-24 py-18 text-center font-sans whitespace-nowrap font-bold mb-4 text-shadow text-8xl ${hovered ? "text-white/90" : "text-white"}`}  dangerouslySetInnerHTML={{__html: text}}>
              
            </div>
          </div>
        </Html>
      </Billboard>
    </group>
  );
}