import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export function PanoramaZoomMobile() {
  const { camera, gl } = useThree();
  const targetFov = useRef(75);
  const lastTouchDistance = useRef(0);

  useEffect(() => {
    const el = gl.domElement;

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        // Tính khoảng cách giữa 2 ngón tay
        const dx = e.touches[0].pageX - e.touches[1].pageX;
        const dy = e.touches[0].pageY - e.touches[1].pageY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (lastTouchDistance.current > 0) {
          // Nếu khoảng cách tăng -> Phóng to (giảm FOV)
          // Nếu khoảng cách giảm -> Thu nhỏ (tăng FOV)
          const delta = distance - lastTouchDistance.current;
          targetFov.current -= delta * 0.1; // Độ nhạy zoom
          targetFov.current = Math.max(30, Math.min(100, targetFov.current));
        }
        lastTouchDistance.current = distance;
      }
    };

    const handleTouchEnd = () => {
      lastTouchDistance.current = 0;
    };

    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd);

    return () => {
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gl]);

  useFrame(() => {
    if (Math.abs(camera.fov - targetFov.current) > 0.1) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, 0.1);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}