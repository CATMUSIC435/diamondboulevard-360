import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";

export function CameraController({ isZooming }) {
  useFrame((state) => {
    // Zoom vào khi chuyển cảnh (FOV giảm xuống), trả lại 75 khi xong
    const targetFov = isZooming ? 25 : 75; 
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFov, 0.05);
    state.camera.updateProjectionMatrix();
  });
  return null;
}