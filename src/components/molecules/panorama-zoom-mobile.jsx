import { useThree, useFrame } from "@react-three/fiber";
import { usePinch, useWheel } from "@use-gesture/react";
import { useSpring } from "@react-spring/three";
import * as THREE from "three";

export function PanoramaZoomMobile({ controlsRef }) {
  const { camera, gl } = useThree();

  const [{ fovSpring }, api] = useSpring(() => ({
    fovSpring: 75,
    config: { 
      mass: 1,
      tension: 250,
      friction: 25
    },
  }));

usePinch(
  ({ offset: [d], active, memo }) => {
    // 1. Tắt xoay khi đang zoom để tránh bị "nhảy" góc nhìn
    if (controlsRef.current) {
      controlsRef.current.enableRotate = !active;
    }

    // 2. Điều chỉnh độ nhạy: 
    // Mobile cần dải zoom rộng hơn một chút để cảm giác mượt
    const zoomSensitivity = 0.5; 
    
    // 75 là FOV mặc định, d là khoảng cách thay đổi giữa 2 ngón tay
    const targetVal = 75 - (d * zoomSensitivity);
    
    api.start({ 
      fovSpring: THREE.MathUtils.clamp(targetVal, 30, 110), // Giới hạn FOV hợp lý cho Mobile
      immediate: false 
    });
  },
  { 
    target: gl.domElement,
    eventOptions: { passive: false },
    pointer: { touch: true }
  }
);

  useWheel(
    ({ offset: [, y] }) => {
      const wheelSensitivity = 0.1;
      const targetVal = 75 + y * wheelSensitivity;
      api.start({ fovSpring: THREE.MathUtils.clamp(targetVal, 20, 120) });
    },
    { target: gl.domElement, eventOptions: { passive: false } }
  );

  useFrame(() => {
    const currentFov = fovSpring.get();
    if (Math.abs(camera.fov - currentFov) > 0.05) {
      camera.fov = currentFov;
      camera.updateProjectionMatrix();
      
      if (controlsRef.current) {
        const factor = THREE.MathUtils.mapLinear(currentFov, 30, 110, 0.2, 0.8);
      controlsRef.current.rotateSpeed = factor;
      }
    }
  });

  return null;
}