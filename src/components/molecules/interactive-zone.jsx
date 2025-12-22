import { useRef } from 'react';
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
  info
}) {
  const meshRef = useRef();
  const { openSidebar } = useSidebar();

  const handleClick = (event) => {
    event.stopPropagation();
    if(info) openSidebar(info);
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
        document.body.style.cursor = 'pointer'; 
      }}
      onPointerOut={() => {
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