"use client";
import { Canvas } from "@react-three/fiber";
import { PanoramaBox } from "./features/panorama-box";
import { OrbitControls } from "@react-three/drei";
import {
  EffectComposer,
  BrightnessContrast,
  HueSaturation,
} from "@react-three/postprocessing";
import { PanoramaZoom } from "./components/molecules/panorama-zoom";
import { SRGBColorSpace } from "three";
// import { Hotspot } from "./components/atoms/hotspot";
// import { PanoramaHotspot } from "./features/panorama-hotspot";
import { Suspense, useState } from "react";
import { Loader } from "./components/atoms/loader";
import { Hotspot } from "./components/atoms/hotspot";
import { SceneTransition } from "./components/atoms/scene-transition";
import { CameraController } from "./components/molecules/camera-controller";

const scenes = {
  cruncher: [
  "/images/cube-map/nx.png",
    "/images/cube-map/px.png",
    "/images/cube-map/py.png",
    "/images/cube-map/ny.png",
    "/images/cube-map/pz.png",
    "/images/cube-map/nz.png",
  ],
  mobicam: [
      "/images/cube-map-1/nx.png",
    "/images/cube-map-1/px.png",
    "/images/cube-map-1/py.png",
    "/images/cube-map-1/ny.png",
    "/images/cube-map-1/pz.png",
    "/images/cube-map-1/nz.png",
  ],
  edge: [
      "/images/cube-map-2/nx.png",
    "/images/cube-map-2/px.png",
    "/images/cube-map-2/py.png",
    "/images/cube-map-2/ny.png",
    "/images/cube-map-2/pz.png",
    "/images/cube-map-2/nz.png",
  ]
};

const SCENE_KEYS = {
  CRUNCHER: 'cruncher',
  MOBICAM: 'mobicam',
  EDGE: 'edge'
};

function App() {
  const [activeScene, setActiveScene] = useState(SCENE_KEYS.CRUNCHER);
  const [isZooming, setIsZooming] = useState(false);
  // const [isChanging, setIsChanging] = useState(false);

const changeScene = (sceneKey) => {
    setIsZooming(true); // Bắt đầu zoom
    
    // Sau 800ms zoom thì mới đổi cảnh
    setTimeout(() => {
      setActiveScene(sceneKey);
      setIsZooming(false); // Trả FOV camera về bình thường
    }, 200);
  };

  return (
    <div className="w-full h-screen bg-gray-400">
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
        <CameraController isZooming={isZooming} />
        <PanoramaZoom />
        
        <Suspense fallback={<Loader />}>
        <PanoramaBox texturePaths={scenes.mobicam}
        isActive={activeScene === SCENE_KEYS.MOBICAM}/>
        <PanoramaBox texturePaths={scenes.edge}
        isActive={activeScene === SCENE_KEYS.EDGE}/>
        <PanoramaBox texturePaths={scenes.cruncher}
        isActive={activeScene === SCENE_KEYS.CRUNCHER}/>
        
        {activeScene === SCENE_KEYS.CRUNCHER && (
          <Hotspot 
            position={[300, 0, -200]} 
            text="Qua dự án MobiCAM" 
            onClick={() => changeScene(SCENE_KEYS.MOBICAM)} 
          />
        )}
        
        {activeScene === SCENE_KEYS.MOBICAM && (
          <Hotspot 
            position={[-300, 0, 100]} 
            text="Về dự án Edge" 
            onClick={() => changeScene(SCENE_KEYS.EDGE)} 
          />
        )}
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
}

export default App;
