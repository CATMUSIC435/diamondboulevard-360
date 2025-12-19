import { useThree, useFrame } from "@react-three/fiber";
import { usePinch, useWheel } from "@use-gesture/react";
import { useSpring } from "@react-spring/three";
import * as THREE from "three";

export function PanoramaZoomMobile({ controlsRef }) {
  const { camera, gl } = useThree();

  const [{ fovSpring }, api] = useSpring(() => ({
    fovSpring: 75,
    config: { 
      mass: 1,       // Tăng khối lượng để tạo cảm giác nặng khi bắt đầu zoom
      tension: 250,  // Giảm độ căng lò xo
      friction: 25   // Tăng mạnh lực cản để zoom đầm và mượt hơn
    },
  }));

  usePinch(
    ({ offset: [d], active }) => {
      if (controlsRef.current) {
        controlsRef.current.enableRotate = !active;
      }

      const zoomSensitivity = 0.4; 
    
      const targetVal = 75 - d * zoomSensitivity;
      
      api.start({ 
        fovSpring: THREE.MathUtils.clamp(targetVal, 5, 140),
        immediate: false 
      });
    },
    { 
      target: gl.domElement,
      eventOptions: { passive: false },
      threshold: 2
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
    if (Math.abs(camera.fov - currentFov) > 0.01) {
      camera.fov = currentFov;
      camera.updateProjectionMatrix();
      
      if (controlsRef.current) {
        // Điều chỉnh tốc độ xoay tương ứng với dải zoom mới
        const factor = THREE.MathUtils.mapLinear(currentFov, 20, 120, 0.1, 0.7);
        controlsRef.current.rotateSpeed = -factor;
      }
    }
  });

  return null;
}