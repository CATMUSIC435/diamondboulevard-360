import { Hotspot } from "../../components/atoms/hotspot";
import { usePanorama } from "../../contexts/panorama-context";
import  { memo, useMemo } from "react";

const MemoizedHotspot = memo(Hotspot);

export const PanoramaHotspot = memo(({ areas }) => {
  const { sceneReady } = usePanorama();

  const renderedHotspots = useMemo(() => {
    if (!sceneReady) return null;
    return areas.map((spot) => (
      <MemoizedHotspot key={spot.key} {...spot} />
    ));
  }, [areas, sceneReady]);

  return <group>{renderedHotspots}</group>;
});