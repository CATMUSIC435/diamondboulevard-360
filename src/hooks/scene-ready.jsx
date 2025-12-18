import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { usePanorama } from "../contexts/panorama-context";

export function SceneReady() {
  const { active, progress } = useProgress();
  const { setSceneReady } = usePanorama();

  useEffect(() => {
    if (!active && progress === 100) {
      setSceneReady(true);
    }
  }, [active, progress, setSceneReady]);

  return null;
}
