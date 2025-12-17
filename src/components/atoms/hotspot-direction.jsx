import { Html, Billboard } from "@react-three/drei";
import { useState } from "react";

export function HotspotDirection({ position, title, imageUrl, onClick }) {
  const [hovered, setHover] = useState(false);

  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[4, 16, 16]} />
        <meshBasicMaterial 
          color={"#fff"} 
          transparent 
          opacity={0} 
        />
      </mesh>

      <Billboard>
        <Html
          center
          distanceFactor={30}
          position={[0, 0, 0]}
          style={{
            pointerEvents: hovered ? "auto" : "none",
            transition: "all 0.3s ease-out",
          }}
        >
          <div 
            className="flex flex-col overflow-hidden"
            style={{ width: "240px" }}
          >
            <div className="h36 w-full overflow-hidden">
              <img 
                src={imageUrl} 
                alt={title} 
                className="h-full w-full object-cover"
              />
            </div>

            {title && <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-1 leading-tight">
                {title}
              </h3>
            </div>}
          </div>
        </Html>
      </Billboard>
    </group>
  );
}