import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useMemo, useRef } from "react";
import { OptimizedHotspot } from "./optimized-hotspot";
import { GlowRings } from "./glow-rings";

export function Hotspot({ position, text, distance = 60, lineHeight = 50, bg = "#002d4d" }) {
  const [hovered, setHover] = useState(false);

  const groupRef = useRef();
  const contentRef = useRef();
  const lineRef = useRef();
  const baseRef = useRef();

  // Re-use vectors to avoid garbage collection
  const v1 = useMemo(() => new THREE.Vector3(), []);
  const v2 = useMemo(() => new THREE.Vector3(), []);

  const baseScale = useMemo(() => distance / 60, [distance]);

  const color = hovered ? "#3b82f6" : "#ffffff";

  useFrame((state) => {
    if (!groupRef.current || !contentRef.current || !lineRef.current || !baseRef.current) return;

    contentRef.current.quaternion.copy(state.camera.quaternion);
    baseRef.current.quaternion.copy(state.camera.quaternion);

    groupRef.current.getWorldPosition(v1);
    state.camera.getWorldDirection(v2);
    const dirToSpot = v1.clone().sub(state.camera.position).normalize();
    const dot = v2.dot(dirToSpot);

    const distortionCorrection = Math.max(0.5, dot);

    const fovRad = (state.camera.fov * Math.PI) / 180;
    const threshold = Math.cos(fovRad / 2) * 0.75;
    const inView = dot > threshold;

    const adjustedScale = baseScale * distortionCorrection;
    const targetScale = inView ? adjustedScale : 0;

    contentRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
    const finalBaseScale = (inView ? baseScale : 0) * pulse * 1.5;
    baseRef.current.scale.lerp(new THREE.Vector3(finalBaseScale, finalBaseScale, finalBaseScale), 0.1);

    const targetLineOpacity = inView ? 0.6 : 0;
    lineRef.current.material.opacity = THREE.MathUtils.lerp(
      lineRef.current.material.opacity,
      targetLineOpacity,
      0.1
    );

    baseRef.current.material.opacity = THREE.MathUtils.lerp(
      baseRef.current.material.opacity,
      inView ? 0.8 : 0,
      0.1
    );
  });

  const startPoint = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const endPoint = useMemo(() => new THREE.Vector3(0, lineHeight, 0), [lineHeight]);


  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
<mesh ref={baseRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />

        <GlowRings color={color} speed={2.5} scaleMax={8} />

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
        color={hovered ? "#3b82f6" : "#fff"}
        lineWidth={0.5 * baseScale}
        transparent
        opacity={0}
      />

      {/* Nội dung Hotspot (Text/UI) - Luôn phẳng với màn hình */}
      <group ref={contentRef} position={endPoint}>
        <OptimizedHotspot text={text} bg={bg} />
      </group>
    </group>
  );
}