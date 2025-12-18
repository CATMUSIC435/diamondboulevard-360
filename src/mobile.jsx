  "use client";

  import { Suspense, useMemo, useState } from "react";
  import { SCENE_KEYS, SCENEMOBILES } from "./constant";
  import { useTexture } from "@react-three/drei";
  import { Canvas } from "@react-three/fiber";
  // import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
  import { HotspotDirection } from "./components/atoms/hotspot-direction";
  import { GlobalCanvasLoader } from "./components/molecules/global-canvas-loader";
import { FullscreenButton } from "./components/atoms/fullscreen-button";
import { PanoramaView } from "./features/panorama-view";
import { PanoramaProvider } from "./contexts/panorama-context";
import { PointHotspot } from "./features/point-hotspot";
import { PanoramaHotspot } from "./features/panorama-hotspot";

  function TexturePreloader() {
    useTexture(SCENEMOBILES.v1.view.textures);
    useTexture(SCENEMOBILES.v2.view.textures);
    useTexture(SCENEMOBILES.v3.view.textures);
    return null;
  }

  export function Mobile() {
    const [activeScene, setActiveScene] = useState(SCENE_KEYS.v1);
    const sceneElements = useMemo(() => {
      return Object.entries(SCENEMOBILES).map(([key]) => (
        <PanoramaProvider>
        <div
          key={key}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${activeScene === key ? "opacity-100 visible z-10" : "opacity-0 invisible z-0 pointer-events-none"}`}
        >
          <PanoramaView scene={SCENEMOBILES[key].view} isActive={activeScene === key} lowPerformance={true}>
          <group>
              <PointHotspot hotspot={SCENEMOBILES[key].hotspot} setActiveScene={setActiveScene}/>
              <PanoramaHotspot />
            </group>
      </PanoramaView> 
      </div>
      </PanoramaProvider>
      ));
    }, [activeScene]);
    

    return (
      <div className="w-full h-screen bg-black overflow-hidden relative select-none">
        <GlobalCanvasLoader />
        <div className="fixed top-4 left-4 z-[70]">
        <FullscreenButton />
      </div>
        <Suspense fallback={null}>
          <Canvas style={{ display: 'none' }} gl={{ antialias: false }}>
            <TexturePreloader />
          </Canvas>
        </Suspense>
        <div className="w-full h-full relative">
          {sceneElements}
        </div>

        {/* <div className="fixed top-1/2 left-2 -translate-y-1/2 z-50">
          <Tabs value={activeScene} onValueChange={setActiveScene}>
            <TabsList className="flex flex-col bg-transparent px-2 gap-2 shadow-2xl">
              {Object.values(SCENE_KEYS).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-sm px-2 py-4 bg-gray-400/20 backdrop-blur-xl data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-bold uppercase text-[10px] tracking-[0.2em] transition-all"
                >
                  {key}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div> */}

        {/* <MusicPlayer /> */}
      </div>
    );
  }