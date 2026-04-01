import InteractiveZone from "../../components/molecules/interactive-zone";
import { usePanorama } from "../../contexts/panorama-context";
import  { memo, useMemo } from "react";

const MemoizedInteractiveZone = memo(InteractiveZone);

export const InteractivePlane = memo(({ planes }) => {
  const { sceneReady } = usePanorama();

  const renderedPlanes = useMemo(() => {
    if (!sceneReady) return null;
    return planes.map(({ key, ...plan }) => (
      <MemoizedInteractiveZone key={key} {...plan} />
    ));
  }, [planes, sceneReady]);

  return (
    <group 
      position={[0, -300, 0]} 
      scale={[35, 1.5, 35]}
    >{renderedPlanes}</group>
  );
});