import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three"
import { useCompass } from "../../contexts/compass-context";

// PHẦN 1: Logic chạy TRONG Canvas
export function CompassLogic() {
  const { camera } = useThree();
  const rotationRef = useCompass();

useFrame(() => {
  if (!rotationRef) return;

  const dir = camera.getWorldDirection(new THREE.Vector3());

  // atan2(x, z) → góc quay quanh trục Y
  let angle = Math.atan2(dir.x, dir.z) * (180 / Math.PI);

  // Chuẩn hóa về 0 → 360
  if (angle < 0) angle += 360;  
  rotationRef.current = angle;
});

  return null;
}

export function CompassUI() {
  const rotationRef = useCompass();
  const stripRef = useRef(null);

  const STEP = 10; 
  const FULL_CIRCLE = 360 * STEP; // 3600px

  useEffect(() => {
    if (!rotationRef) return;

    let animationId;
    const updateUI = () => {
      if (stripRef.current && rotationRef.current !== undefined) {
        // 1. Ép góc về khoảng [0, 360] để xử lý số âm
        let angle = rotationRef.current % 360;
        if (angle < 0) angle += 360; 

        const xOffset = (angle * STEP) + FULL_CIRCLE;

        // 3. Di chuyển dải thước trượt ngang
        stripRef.current.style.transform = `translateX(calc(50% - ${xOffset}px))`;
      }
      animationId = requestAnimationFrame(updateUI);
    };

    updateUI();
    return () => cancelAnimationFrame(animationId);
  }, [rotationRef, FULL_CIRCLE]);

  const markers = [
    { label: "BẮC", deg: 0 },
    { label: "ĐÔNG", deg: 90 },
    { label: "NAM", deg: 180 },
    { label: "TÂY", deg: 270 },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-11 bg-[#243c44]/80 backdrop-blur-sm border-b border-white/10 z-[9999] pointer-events-none overflow-hidden flex items-center">
      {/* Kim đỏ ở giữa - Luôn cố định */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-red-600 z-50 shadow-[0_0_8px_red]" />

      <div 
        ref={stripRef} 
        className="flex items-end h-full will-change-transform w-[1500px]"
      >
        {[-360, 0, 360].map((groupOffset) => (
          <div key={groupOffset} className="flex items-end">
            {markers.map((m) => (
              <div 
                key={m.label} 
                className="relative flex flex-col items-center justify-end pb-1"
                style={{ width: `${90 * STEP}px` }} 
              >
                <span className="text-[#3b82f6] text-sm font-bold tracking-widest mb-0 drop-shadow-sm">
                  {m.label}
                </span>

                <div className="flex w-full justify-between items-end h-4">
                  <div className="w-[2px] h-4 bg-gray-300/80" />
                  
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-[1px] h-2 bg-gray-300/40" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}