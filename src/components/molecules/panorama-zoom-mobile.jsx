import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function PanoramaZoomMobile() {
  const { camera, gl } = useThree();

  useEffect(() => {
    let startDistance = 0;

    const onTouchStart = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        startDistance = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const delta = startDistance - distance;
        camera.fov = THREE.MathUtils.clamp(camera.fov + delta * 0.05, 40, 90);
        camera.updateProjectionMatrix();
      }
    };

    gl.domElement.addEventListener("touchstart", onTouchStart);
    gl.domElement.addEventListener("touchmove", onTouchMove);

    return () => {
      gl.domElement.removeEventListener("touchstart", onTouchStart);
      gl.domElement.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return null;
}
