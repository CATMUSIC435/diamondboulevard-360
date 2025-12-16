"use client";
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
import { memo, Suspense } from "react";
import { Loader } from "../../components/atoms/loader";

export const PanoramaView = memo(({ scene }) => {
  return (
    <div className="w-full h-screen bg-gray-400 cursor-pointer">
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 3000,
          position: [0, 0, 0.001],
        }}
        gl={{
          outputColorSpace: SRGBColorSpace,
          toneMappingExposure: 1.1,
        }}
      >
        {/* <CameraController isZooming={isZooming} /> */}
        <PanoramaZoom />

        <Suspense fallback={<Loader />}>
          <PanoramaBox texturePaths={scene}
            isActive={1} />

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
        <EffectComposer>
          <BrightnessContrast BrightnessContrast={-0.05} contrast={0.05} />
          <HueSaturation saturation={0.15} />
        </EffectComposer>
        {/* <PanoramaZoom /> */}
        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.4}
          enableZoom={false}
        />
      </Canvas>
    </div>
  );
});
