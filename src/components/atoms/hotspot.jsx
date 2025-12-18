import { Billboard, Html, Line } from "@react-three/drei";
import { DoubleSide, Vector3 } from "three";
import { useState, useMemo } from "react";

export function Hotspot({ position, text, image, nextSceneImages, onClick, lineHeight = 50 }) {
  const [hovered, setHover] = useState(false);

  const handlePointerOver = () => {
    setHover(true);
    // LAZY LOADING: Tải trước ảnh của cảnh tiếp theo khi di chuột vào điểm neo
    if (nextSceneImages) {
      useTexture.preload(nextSceneImages);
      console.log("Đang tải ngầm cảnh:", text);
    }
  };

  // Điểm neo trên ảnh (gốc) - đặt tại tâm của group
  const startPoint = useMemo(() => new Vector3(0, 0, 0), []);
  
  // Điểm kết thúc: thay đổi tọa độ Y dựa trên prop lineHeight
  const endPoint = useMemo(() => new Vector3(0, lineHeight, 0), [lineHeight]);

  return (
    <group position={position} onPointerOver={handlePointerOver} onPointerOut={() => setHover(false)} onClick={onClick}>
      {/* 1. Điểm neo ẩn/hiện trên mặt ảnh để bắt sự kiện click/hover */}
      <mesh onClick={() => {
        console.log(position, text, image, nextSceneImages, onClick, lineHeight);
        
      }}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial 
          color={hovered ? "#ff0000" : "#ffffff"} 
          transparent 
          opacity={1} // Hiện nhẹ khi hover để người dùng biết điểm neo
          side={DoubleSide}
        />
      </mesh>

      {/* 2. Đường line với độ dài động */}
      <Line
        points={[startPoint, endPoint]} 
        color={hovered ? "red" : "white"}
        lineWidth={1.5}
        transparent
        opacity={0.6}
      />

      {/* 3. Text label tại đầu đường line */}
      <Billboard position={endPoint}>
        <Html center distanceFactor={60}>
          <div 
            className={`flex flex-col items-center transition-all duration-300 pointer-events-none pb-56`}
            style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
          >
            {/* Văn bản dự án */}
            <div 
              className={`whitespace-nowrap font-bold mb-4 text-shadow text-6xl ${hovered ? "text-red-500" : "text-black"}`}>
              {text}
            </div>

            {/* Hình ảnh dự án (Hiện khi hover hoặc luôn hiện tùy bạn) */}
            <div className="overflow-hidden rounded-lg w-[280px] h-60">
              <img 
                src={image || "/images/default-project.jpg"} 
                alt={text}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Html>
      </Billboard>
    </group>
  );
}