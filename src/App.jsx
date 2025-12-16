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

function App() {
  const [currentScene, setScene] = useState(scenes.cruncher);
  const [isChanging, setIsChanging] = useState(false);

  const changeScene = (newScenePaths) => {
    setIsChanging(true); // Bắt đầu tối màn hình
    
    setTimeout(() => {
      setScene(newScenePaths); // Đổi cảnh khi màn hình đã tối đen
      
      // Đợi một chút để texture mới kịp render rồi mới mở màn hình
      setTimeout(() => setIsChanging(false), 500); 
    }, 700); // Khớp với duration-700 của CSS
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
        <Suspense fallback={<Loader />}>
        <PanoramaBox texturePaths={currentScene}/>
        <SceneTransition isChanging={isChanging} />
        {/* <PanoramaHotspot/> */}
          <Hotspot 
          position={[300, 0, -200]} 
            text="Đi đến cruncher" 
            nextSceneImages={scenes.cruncher}
          onClick={() => changeScene(scenes.cruncher)} 
        />
        </Suspense>
        
        <group>
          {/* <Hotspot 
          position={[300, 0, -200]} 
            text="Đi đến cruncher" 
            nextSceneImages={scenes.cruncher}
          onClick={() => changeScene(scenes.cruncher)} 
        /> */}
         {/* <Hotspot 
          position={[400, 0, -200]} 
          text="Đi đến MobiCAM" 
            nextSceneImages={scenes.mobicam}
          onClick={() => changeScene(scenes.mobicam)} 
        />
         <Hotspot
          position={[500, 0, -200]} 
          text="Đi đến Edge" 
            nextSceneImages={scenes.edge}
          onClick={() => changeScene(scenes.edge)} 
        /> */}
        </group>
        <EffectComposer>
          <BrightnessContrast BrightnessContrast={-0.05} contrast={0.05} />
          <HueSaturation saturation={0.15} />
        </EffectComposer>
        <PanoramaZoom />
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
