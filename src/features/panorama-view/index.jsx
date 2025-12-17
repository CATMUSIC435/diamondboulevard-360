"use client";
import { memo, Suspense, useEffect, useState } from "react";
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

export const PanoramaView = memo(({ scene, isActive, children }) => {
  const [showEffects, setShowEffects] = useState(false);

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
    <div className="w-full h-screen bg-gray-400 cursor-pointer">
      <Canvas
        frameloop={isActive ? "always" : "never"}
        camera={{
          fov: 75,
          near: 0.1,
          far: 3000,
          position: [0, 0, 0.001],
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          outputColorSpace: SRGBColorSpace,
          toneMappingExposure: 1.1,
          stencil: false,
          depth: false,
        }}
      >
        <PanoramaZoom />

        <Suspense fallback={null}>
          <PanoramaBox texturePaths={scene} isActive={isActive} />
          {children && children}
        </Suspense>
       {isActive && showEffects && (
          <EffectComposer 
          disableNormalPass 
          multisampling={4}
          frameBufferType={THREE.HalfFloatType}>
            <BrightnessContrast contrast={0.05} />
            <HueSaturation saturation={0.15} />
          </EffectComposer>
        )}
        
        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={-0.4}
          enableZoom={false}
        />
      </Canvas>
    </div>
  );
});
