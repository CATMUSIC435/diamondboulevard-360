"use client";

import { Suspense, useMemo, useState } from "react";
import { SCENE_KEYS, SCENES } from "./constant";
import { PanoramaView } from "./features/panorama-view/index";
import { useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";

// Tách Preloader để code sạch hơn

function TexturePreloader() {
  // Chỉ cần gọi hook này một lần cho tất cả các bộ ảnh
  useTexture(SCENES.cruncher.textures);
  useTexture(SCENES.mobicam.textures);
  useTexture(SCENES.edge.textures);
  return null;
}


function App() {
  const [activeScene, setActiveScene] = useState(SCENE_KEYS.CRUNCHER);

  // Memoize list cảnh để tránh render lại cấu trúc DOM
  const sceneElements = useMemo(() => {
    return Object.entries(SCENES).map(([key]) => (
      <div
        key={key}
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
          ${activeScene === key ? "opacity-100 visible z-10" : "opacity-0 invisible z-0 pointer-events-none"}`}
      >
        {/* Chỉ truyền textures vào PanoramaView */}
        <PanoramaView scene={SCENES[key]} isActive={activeScene === key} />
      </div>
    ));
  }, [activeScene]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* 1. Preloader ngầm */}
      <Suspense fallback={null}>
        <Canvas style={{ display: 'none' }} gl={{ antialias: false }}>
          <TexturePreloader />
        </Canvas>
      </Suspense>

      {/* 2. Hiển thị các cảnh */}
      <div className="w-full h-full relative">
        {sceneElements}
      </div>

      {/* 3. Điều khiển Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <Tabs value={activeScene} onValueChange={setActiveScene}>
          <TabsList className="h-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-2 gap-2 shadow-2xl">
            {Object.values(SCENE_KEYS).map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="rounded-full px-6 py-2 data-[state=active]:bg-red-600 data-[state=active]:text-white font-bold uppercase text-[10px] tracking-[0.2em] transition-all"
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