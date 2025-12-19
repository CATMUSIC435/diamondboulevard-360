import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export function PanoramaZoom() {
  const { camera, gl } = useThree();
  const targetFov = useRef(75);

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      // Chỉnh độ nhạy zoom ở đây (0.05)
      targetFov.current += e.deltaY * 0.05;
      targetFov.current = Math.max(30, Math.min(100, targetFov.current));
    };

    const el = gl.domElement;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [gl]);

  useFrame(() => {
    // Nội suy mượt mà
    if (Math.abs(camera.fov - targetFov.current) > 0.01) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, 0.1);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
