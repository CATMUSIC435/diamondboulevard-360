import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { usePanorama } from "../contexts/panorama-context";

export function SceneReady() {
  const { active, progress } = useProgress();
  const { setSceneReady } = usePanorama();

  useEffect(() => {
    if (!active && progress === 100) {
      
      const timer = setTimeout(() => {
        setSceneReady(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSceneReady(false);
    }
  }, [active, progress, setSceneReady]);

  return null;
}