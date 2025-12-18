import { useState, useRef } from 'react';
import { DoubleSide } from 'three';
import { useSidebar } from '../../contexts/sidebar-context';

/**
 * @param {Array} args
 * @param {number} opacity
 */
function InteractiveZone({ 
  position = [0.6, -10, -0.2], 
  rotation = [-Math.PI / 2, 0.05, 0],
  scale = [1, 1, 1],
  args = [1.2, 1.4],
  color = "#ffffff",
  baseOpacity = 1,
  info
}) {
  const meshRef = useRef();
  const { openSidebar } = useSidebar();
  const [hovered, setHover] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    const { point, uv } = event;
    openSidebar(info);
    console.log('Chạm vào vùng ẩn tại:', { world: point, uv });
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={handleClick}
      onPointerOver={(e) => { 
        e.stopPropagation(); 
        setHover(true); 
        document.body.style.cursor = 'pointer'; 
      }}
      onPointerOut={() => { 
        setHover(false); 
        document.body.style.cursor = 'auto'; 
      }}
    >
      <planeGeometry args={args} />
      <meshBasicMaterial
        color={color}
        transparent={true}
        // opacity={hovered ? baseOpacity + 0.2 : baseOpacity} 
        opacity={0} 
        side={DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default InteractiveZone;