"use client";

import { useMemo, useState, useCallback } from "react";
import { SCENE_KEYS, SCENEMOBILES } from "./constant";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { GlobalCanvasLoader } from "./components/molecules/global-canvas-loader";
import { FullscreenButton } from "./components/atoms/fullscreen-button";
import { PanoramaView } from "./features/panorama-view";
import { PanoramaProvider } from "./contexts/panorama-context";
import { PointHotspot } from "./features/point-hotspot";
import { PanoramaHotspot } from "./features/panorama-hotspot";
import { Home } from "lucide-react";
import { SidebarProvider } from "./contexts/sidebar-context";
import { InteractivePlane } from "./features/interactive-plane";
import { SidebarUI } from "./components/molecules/sidebar-ui";
import { CompassLogic, CompassUI } from "./components/molecules/compass-ui";
import { CompassProvider } from "./contexts/compass-context";
import { FloatingMenu } from "./features/floating-menu/floating-menu";

export function Mobile() {
  const [activeScene, setActiveScene] = useState(SCENE_KEYS.v1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSceneChange = useCallback((nextScene) => {
    if (nextScene === activeScene || isTransitioning) return;

    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveScene(nextScene);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 400);
  }, [activeScene, isTransitioning]);

  const currentSceneData = useMemo(() => SCENEMOBILES[activeScene], [activeScene]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative select-none">
      <GlobalCanvasLoader img="/images/screen-mobile.jpg"/>
      <div 
        className={`fixed inset-0 z-[100] bg-black transition-opacity duration-500 pointer-events-none flex items-center justify-center
        ${isTransitioning ? "opacity-100" : "opacity-0"}`}
      >
        <div className="text-white/50 text-xs tracking-widest uppercase animate-pulse">
          Đang nạp bối cảnh...
        </div>
      </div>

      <div className="fixed top-12 md:top-8 left-3 md:left-4 z-[70]">
        <FullscreenButton />
      </div>
 <CompassProvider>
      <SidebarProvider>
        <PanoramaProvider>
          <div className="w-full h-full relative">
             <CompassUI />
            <div className="absolute inset-0 z-10">
              
              <PanoramaView 
                key={activeScene} 
                scene={currentSceneData.view} 
                isActive={true} 
                lowPerformance={true}
              >
                <group>
                  <PointHotspot 
                    hotspot={currentSceneData.hotspot} 
                    setActiveScene={handleSceneChange} 
                  />
                  
                  {currentSceneData.areas?.length > 0 && (
                    <PanoramaHotspot areas={currentSceneData.areas} />
                  )}
                  
                  {currentSceneData.planes && (
                    <InteractivePlane planes={currentSceneData.planes} />
                  )}
                  <CompassLogic />
                </group>
              </PanoramaView>
            </div>

            <SidebarUI />
          </div>
        </PanoramaProvider>
      </SidebarProvider>
</CompassProvider>

      <div className="fixed top-1/2 left-2 -translate-y-1/2 z-50">
        <Tabs value={activeScene} onValueChange={handleSceneChange} className="bg-transparent">
          <TabsList className="flex flex-col bg-transparent px-2 gap-2 shadow-2xl">
              <TabsTrigger
                value={SCENE_KEYS.v1}
                disabled={isTransitioning}
                className="rounded-full px-2 py-4 bg-black/40 border border-white/5 backdrop-blur-xl data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-bold uppercase text-[10px] tracking-[0.2em] transition-all disabled:opacity-50"
              >
                <Home size={16} /> 
              </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <FloatingMenu isLarge={true} />
    </div>
  );
}