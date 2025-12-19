import { useThree, useFrame } from "@react-three/fiber";
import { usePinch, useWheel } from "@use-gesture/react";
import { useSpring } from "@react-spring/three";
import * as THREE from "three";

export function PanoramaZoomMobile({ controlsRef }) {
  const { camera, gl } = useThree();

  const [{ fovSpring }, api] = useSpring(() => ({
    fovSpring: 75,
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  usePinch(
    ({ offset: [d], active }) => {
      // 1. KHI ĐANG PINCH (active = true), KHÓA XOAY
      if (controlsRef.current) {
        controlsRef.current.enableRotate = !active;
      }

      const val = 75 - d / 5;
      api.start({ fovSpring: THREE.MathUtils.clamp(val, 30, 100) });
    },
    { 
      target: gl.domElement,
      eventOptions: { passive: false } 
    }
  );

  useWheel(
    ({ offset: [, y] }) => {
      const val = 75 + y / 10;
      api.start({ fovSpring: THREE.MathUtils.clamp(val, 30, 100) });
    },
    { 
      target: gl.domElement,
      eventOptions: { passive: false } 
    }
  );

  useFrame(() => {
    const currentFov = fovSpring.get();
    if (camera.fov !== currentFov) {
      camera.fov = currentFov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
