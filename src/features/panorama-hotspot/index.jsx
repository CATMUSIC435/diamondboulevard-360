import { Hotspot } from "../../components/atoms/hotspot";

export function PanoramaHotspot() {
  const RADIUS = 400;
  const TOTAL_HOTSPOTS = 20;
  
  const hotspots = Array.from({ length: TOTAL_HOTSPOTS }, (_, i) => {
    const angle = (i / TOTAL_HOTSPOTS) * Math.PI * 2;
    return {
      id: i,
      position: [
        Math.cos(angle) * RADIUS, 
        0,
        Math.sin(angle) * RADIUS
      ],
      text: `Dự án ${i + 1}`
    };
  });

  return (
    <group>
      {hotspots.map((spot) => (
        <Hotspot 
          key={spot.id} 
          position={spot.position} 
          text={spot.text} 
          onClick={() => console.log(`Clicked ${spot.text}`)}
        />
      ))}
    </group>
  );
}