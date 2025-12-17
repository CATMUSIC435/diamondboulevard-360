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
        <sphereGeometry args={[8, 16, 16]} />
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
            className="flex flex-col"
            style={{ width: "240px" }}
          >
            <div className="h36 w-full relative">
              <img 
                src={imageUrl} 
                alt={title} 
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100 animate-bounce"
              />
            </div>

            {title && <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-1 leading-tight">
                {title}
              </h3>
            </div>}
            <style jsx>{`
  @keyframes sweep {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(200%) rotate(45deg); }
  }
`}</style>
          </div>
        </Html>
      </Billboard>
    </group>
  );
}