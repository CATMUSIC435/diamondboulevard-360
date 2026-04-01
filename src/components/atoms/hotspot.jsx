import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { OptimizedHotspot } from "./optimized-hotspot";
import { GlowRings } from "./glow-rings";

export function Hotspot({ position, text, distance = 60, lineHeight = 50, bg = "#002d4d" }) {

  const groupRef = useRef();
  const contentRef = useRef();
  const lineRef = useRef();
  const baseRef = useRef();

  const v1 = useMemo(() => new THREE.Vector3(), []);
  const v2 = useMemo(() => new THREE.Vector3(), []);
  const dirToSpot = useMemo(() => new THREE.Vector3(), []);

  const baseScale = useMemo(() => distance / 60, [distance]);

  const color = "#ffffff";

  useFrame((state, delta) => {
    if (!groupRef.current || !contentRef.current || !lineRef.current || !baseRef.current) return;

    // Billboarding mềm mại (slerp thay vì copy cứng)
    contentRef.current.quaternion.slerp(state.camera.quaternion, 12 * delta);
    baseRef.current.quaternion.slerp(state.camera.quaternion, 12 * delta);

    groupRef.current.getWorldPosition(v1);
    state.camera.getWorldDirection(v2);
    
    // Tái sử dụng vector thay vì clone()
    dirToSpot.copy(v1).sub(state.camera.position).normalize();
    const dot = v2.dot(dirToSpot);

    const distortionCorrection = Math.max(0.6, dot);

    const fovRad = (state.camera.fov * Math.PI) / 180;
    
    // Logic bù đắp kích thước khi Camera Zoom (Thay đổi FOV)
    // Dựa trên công thức Perspective: Projected Size tỉ lệ thuận với 1 / tan(fov/2)
    // Lấy mốc FOV mặc định là 75 độ (tan(37.5) = 0.767)
    const zoomScale = Math.tan(fovRad / 2) / 0.767326987;
    groupRef.current.scale.setScalar(zoomScale);

    // Nới góc nhìn ra để tránh bị ẩn sớm, dùng smoothstep để chuyển vùng mượt không bị khựng
    const threshold = Math.cos(fovRad / 2) * 0.55; 
    const inViewFactor = THREE.MathUtils.smoothstep(dot, threshold - 0.15, threshold + 0.15);

    const adjustedScale = baseScale * distortionCorrection;
    
    // Hiệu ứng "pop" nhún nhẹ (nếu inViewFactor tiến tới 1, scale trồi lố qua 1 chút rồi rút lại nhè nhẹ)
    const targetScale = adjustedScale * inViewFactor;

    // Dùng damp để nội suy mượt theo thời gian độc lập khung hình
    const dampSpeed = inViewFactor > 0.5 ? 8 : 12; // Ganh scale nhanh hơn khi nở ra trồi lên
    
    contentRef.current.scale.x = THREE.MathUtils.damp(contentRef.current.scale.x, targetScale, dampSpeed, delta);
    contentRef.current.scale.y = contentRef.current.scale.x;
    contentRef.current.scale.z = contentRef.current.scale.x;

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.12;
    const finalBaseScale = (baseScale * inViewFactor) * pulse * 1.5;
    
    baseRef.current.scale.x = THREE.MathUtils.damp(baseRef.current.scale.x, finalBaseScale, 8, delta);
    baseRef.current.scale.y = baseRef.current.scale.x;
    baseRef.current.scale.z = baseRef.current.scale.x;

    const targetLineOpacity = inViewFactor * 0.6;
    lineRef.current.material.opacity = THREE.MathUtils.damp(
      lineRef.current.material.opacity,
      targetLineOpacity,
      8,
      delta
    );

    baseRef.current.material.opacity = THREE.MathUtils.damp(
      baseRef.current.material.opacity,
      inViewFactor * 0.8,
      8,
      delta
    );
  }, -2);

  const startPoint = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const endPoint = useMemo(() => new THREE.Vector3(0, lineHeight, 0), [lineHeight]);


  return (
    <group
      ref={groupRef}
      position={position}
    >
<mesh ref={baseRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} toneMapped={false} />

        <GlowRings color={color} speed={2.5} scaleMax={4} />

        <mesh scale={[1.3, 1.3, 1.3]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <shaderMaterial
            transparent
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            uniforms={{ glowColor: { value: new THREE.Color(color) } }}
            vertexShader={`
              varying float intensity;
              void main() {
                vec3 vNormal = normalize(normalMatrix * normal);
                intensity = pow(0.7 - dot(vNormal, vec3(0,0,1.0)), 3.0);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform vec3 glowColor;
              varying float intensity;
              void main() {
                gl_FragColor = vec4(glowColor, intensity);
              }
            `}
          />
        </mesh>
      </mesh>

      <Line
        ref={lineRef}
        points={[startPoint, endPoint]}
        color={"#fff"}
        lineWidth={0.5 * baseScale}
        transparent
        opacity={0}
      />

      <group ref={contentRef} position={endPoint}>
        <OptimizedHotspot text={text} bg={bg} />
      </group>
    </group>
  );
}