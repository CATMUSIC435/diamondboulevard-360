import { Hotspot } from "../../components/atoms/hotspot";

export function PanoramaHotspot() {
  const RADIUS = 400; // Khoảng cách từ camera đến điểm Hotspot
  const TOTAL_HOTSPOTS = 20; // Số lượng điểm cần gen

  // Tạo mảng 20 phần tử
  const hotspots = Array.from({ length: TOTAL_HOTSPOTS }, (_, i) => {
    const angle = (i / TOTAL_HOTSPOTS) * Math.PI * 2; // Chia đều 360 độ
    return {
      id: i,
      position: [
        Math.cos(angle) * RADIUS, 
        0, // Độ cao (Y), bạn có thể thay đổi để zic-zac
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