"use client";
import { memo, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { SRGBColorSpace } from "three";
import { Canvas } from "@react-three/fiber";
import { PanoramaBox } from "../panorama-box/index";
import { OrbitControls } from "@react-three/drei";
import {
  EffectComposer,
  BrightnessContrast,
  HueSaturation,
} from "@react-three/postprocessing";
import { PanoramaZoom } from "../../components/molecules/panorama-zoom";
import { usePanorama } from "../../contexts/panorama-context";
import { SceneReady } from "../../hooks/scene-ready";
import { PanoramaZoomMobile } from "../../components/molecules/panorama-zoom-mobile";

export const PanoramaView = memo(({ scene, isActive, children, lowPerformance = false }) => {
  const [showEffects, setShowEffects] = useState(false);
  const { sceneReady } = usePanorama();

  const controlsRef = useRef();

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setTimeout(() => setShowEffects(true), 1000);
    } else {
      setShowEffects(false);
    }
    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div className="w-full h-screen bg-gray-400">
      <Canvas
        frameloop={isActive ? "always" : "never"}
        camera={{
          fov: 20,
          near: 0.1,
          far: 3000,
          position: [0.05, 99.97, 2.31],
        }}
        dpr={lowPerformance ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !lowPerformance,
          // toneMapping: THREE.ACESFilmicToneMapping,
          powerPreference: "high-performance",
          outputColorSpace: SRGBColorSpace,
          toneMappingExposure: 1.1,
          stencil: false,
          depth: false,
        }}
      >
        {lowPerformance ? <PanoramaZoomMobile controlsRef={controlsRef}/> : <PanoramaZoom />}

        <Suspense fallback={null}>
          <PanoramaBox texturePaths={scene} isActive={isActive} />
          <SceneReady />
          {children && children}
        </Suspense>
        {isActive && !lowPerformance && showEffects && sceneReady && (
          <EffectComposer
            disableNormalPass
            multisampling={4}
            frameBufferType={THREE.HalfFloatType}>
            <BrightnessContrast contrast={0.05} />
            <HueSaturation saturation={0.15} />
          </EffectComposer>
        )}

        <OrbitControls
        ref={controlsRef}
         enablePan={false}
          enableDamping
          dampingFactor={0.1}
          rotateSpeed={lowPerformance ? -0.6 : -0.4}
          enableZoom={false}
          minDistance={0.01}
          maxDistance={500}
        />
      </Canvas>
    </div>
  );
});
