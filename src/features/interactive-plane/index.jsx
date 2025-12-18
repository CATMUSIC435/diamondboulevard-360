import InteractiveZone from "../../components/molecules/interactive-zone";
import { usePanorama } from "../../contexts/panorama-context";
import  { memo, useMemo } from "react";

const MemoizedInteractiveZone = memo(InteractiveZone);

export const InteractivePlane = memo(({ planes }) => {
  const { sceneReady } = usePanorama();

  const renderedPlanes = useMemo(() => {
    if (!sceneReady) return null;
    return planes.map((plan) => (
      <MemoizedInteractiveZone {...plan} />
    ));
  }, [planes, sceneReady]);

  return <group>{renderedPlanes}</group>;
});