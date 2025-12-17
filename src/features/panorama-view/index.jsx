"use client";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { PanoramaBox } from "../panorama-box/index";
import { OrbitControls } from "@react-three/drei";
import {
  EffectComposer,
  BrightnessContrast,
  HueSaturation,
} from "@react-three/postprocessing";
import { PanoramaZoom } from "../../components/molecules/panorama-zoom";
import { SRGBColorSpace } from "three";
import { memo, Suspense, useEffect, useState } from "react";

export const PanoramaView = memo(({ scene, isActive }) => {
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive) {
      // Đợi hiệu ứng fade 1s xong mới bật Effect cho nhẹ
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
        {/* <CameraController isZooming={isZooming} /> */}
        <PanoramaZoom />

        <Suspense fallback={null}>
          <PanoramaBox texturePaths={scene} isActive={isActive} />

          {/* <Hotspot 
            position={[300, 0, -300]} 
            text="Qua dự án MobiCAM" 
            onClick={() => changeScene(SCENE_KEYS.MOBICAM)} 
          />
          <Hotspot 
            position={[300, 0, -200]} 
            text="Qua dự án MobiCAM" 
            onClick={() => changeScene(SCENE_KEYS.MOBICAM)} 
          />
          <Hotspot 
            position={[-300, 0, 100]} 
            text="Về dự án Edge" 
            onClick={() => changeScene(SCENE_KEYS.EDGE)} 
          /> */}
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
        {/* <PanoramaZoom /> */}
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
