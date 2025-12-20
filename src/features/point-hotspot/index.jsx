import { HotspotDirection } from "../../components/atoms/hotspot-direction";
import { usePanorama } from "../../contexts/panorama-context";

export function PointHotspot({ hotspot, setActiveScene }) {
    const { sceneReady } = usePanorama();

    if (!sceneReady) return null;

    return (
        <group>
            {
                hotspot.map((item) =>
                    <HotspotDirection
                        key={item.key}
                        position={item.position}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        onClick={() => setActiveScene(item.key)}
                        size={item.size ?? 1}
                    />
                )
            }
        </group>
    );
}