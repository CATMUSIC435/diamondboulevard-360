"use client";
import { memo, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { SRGBColorSpace } from "three";
import { Canvas } from "@react-three/fiber";
import { PanoramaBox } from "../panorama-box/index";
import { AdaptiveDpr, AdaptiveEvents, OrbitControls } from "@react-three/drei";
import {
  EffectComposer,
  BrightnessContrast,
  HueSaturation,
  Vignette,
} from "@react-three/postprocessing";
import { usePanorama } from "../../contexts/panorama-context";
import { SceneReady } from "../../hooks/scene-ready";
import { PanoramaZoomMobile } from "../../components/molecules/panorama-zoom-mobile";

// Import các Hotspot và tính năng nội khu
import { PointHotspot } from "../point-hotspot";
import { PanoramaHotspot } from "../panorama-hotspot";
import { InteractivePlane } from "../interactive-plane";
import { CompassLogic } from "../../components/molecules/compass-ui";

export const PanoramaView = memo(({ scenesData, activeSceneKey, setActiveScene, lowPerformance = false }) => {
  const [showEffects, setShowEffects] = useState(false);
  const { sceneReady } = usePanorama();
  const controlsRef = useRef();

  useEffect(() => {
    let timer;
    if (activeSceneKey) {
      timer = setTimeout(() => setShowEffects(true), 1000);
    } else {
      setShowEffects(false);
    }
    return () => clearTimeout(timer);
  }, [activeSceneKey]);

  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        frameloop="always" // Luôn re-render để duy trì hiệu ứng mượt
        camera={{
          fov: 20,
          near: 0.1,
          far: 3000,
          position: [0.05, 99.97, 2.31],
        }}
        dpr={lowPerformance ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !lowPerformance,
          toneMapping: THREE.ACESFilmicToneMapping,
          powerPreference: "high-performance",
          outputColorSpace: SRGBColorSpace,
          toneMappingExposure: 0.8,
          stencil: false,
          depth: false,
        }}
      >
        <PanoramaZoomMobile controlsRef={controlsRef}/>
        <Suspense fallback={null}>
          <SceneReady />
          {Object.entries(scenesData).map(([key, data]) => {
            const isActive = key === activeSceneKey;
            return (
              <group key={key}>
                <PanoramaBox texturePaths={data.view} isActive={isActive} />
                {isActive && (
                  <group>
                    <PointHotspot hotspot={data.hotspot} setActiveScene={setActiveScene} />
                    {data.areas?.length > 0 && <PanoramaHotspot areas={data.areas} />}
                    {data?.planes && <InteractivePlane planes={data.planes} />}
                    <CompassLogic />
                  </group>
                )}
              </group>
            );
          })}
        </Suspense>

        {!lowPerformance && showEffects && sceneReady && (
          <EffectComposer
            disableNormalPass
            multisampling={4}
            frameBufferType={THREE.HalfFloatType}>
            <BrightnessContrast contrast={0.05} />
            <HueSaturation saturation={0.15} />
            <Vignette eskil={false} offset={0.1} darkness={0.5} />
          </EffectComposer>
        )}

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={lowPerformance ? -0.6 : -0.4}
          enableZoom={false}
          minDistance={0.01}
          maxDistance={500}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
});
