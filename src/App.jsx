"use client";

import { useState } from "react";
import { SCENE_KEYS, SCENES } from "./constant";
import { PanoramaView } from "./features/panorama-view/index";
import { useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";

function TexturePreloader() {
  // Chỉ cần gọi hook này một lần cho tất cả các bộ ảnh
  useTexture(SCENES.cruncher.textures);
  useTexture(SCENES.mobicam.textures);
  useTexture(SCENES.edge.textures);
  return null;
}

function App() {
  const [activeScene, setActiveScene] = useState(SCENE_KEYS.CRUNCHER);

  return (
    <div className="w-full h-screen bg-gray-400 cursor-pointer relative">
      <Canvas style={{ display: 'none' }}>
        <TexturePreloader />
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className={`absolute inset-0 transition-opacity duration-700 
        ${activeScene === SCENE_KEYS.CRUNCHER ? "opacity-100 visible z-10" : "opacity-0 invisible z-0 pointer-events-none"}`}>
          <PanoramaView scene={SCENES.cruncher} />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-700 
        ${activeScene === SCENE_KEYS.MOBICAM ? "opacity-100 visible z-10" : "opacity-0 invisible z-0 pointer-events-none"}`}>
          <PanoramaView scene={SCENES.mobicam} />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-700 
        ${activeScene === SCENE_KEYS.EDGE ? "opacity-100 visible z-10" : "opacity-0 invisible z-0 pointer-events-none"}`}>
          <PanoramaView scene={SCENES.edge} />
        </div>
      </div>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <Tabs
          value={activeScene}
          onValueChange={(value) => setActiveScene(value)}
        >
          <TabsList className="h-12 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-2 gap-2">
            {Object.values(SCENE_KEYS).map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="rounded-full px-6 py-2 data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold uppercase text-xs tracking-widest transition-all"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
