import { Hotspot } from "../../components/atoms/hotspot";
import { usePanorama } from "../../contexts/panorama-context";

export function PanoramaHotspot({areas}) {
  const { sceneReady } = usePanorama();

  if (!sceneReady) return null;
  const RADIUS = 400;
  const TOTAL_HOTSPOTS = 20;
  
  const hotspots = Array.from({ length: TOTAL_HOTSPOTS }, (_, i) => {
    const angle = (i / TOTAL_HOTSPOTS) * Math.PI * 2;
    return {
      id: i,
      position: [
        Math.cos(angle) * RADIUS, 
        -10,
        Math.sin(angle) * RADIUS
      ],
      text: `Lorem ipsum, <br />dolor sit amet<br /> adipisicing elit.`
    };
  });

  return (
    <group>
      {/* {hotspots.map((spot) => (
        <Hotspot 
          key={spot.id} 
          position={spot.position} 
          text={spot.text} 
          onClick={() => console.log(`Clicked ${spot.text}`)}
        />
      ))} */}
      {
        areas.map((spot) => (<Hotspot {...spot} />))
      }
    </group>
  );
}