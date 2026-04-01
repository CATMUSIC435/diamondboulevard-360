"use client";

import { useState } from "react";
import { SCENE_KEYS, SCENES } from "./constant";
import { PanoramaView } from "./features/panorama-view/index";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { GlobalCanvasLoader } from "./components/molecules/global-canvas-loader";
import { FullscreenButton } from "./components/atoms/fullscreen-button";
import { FloatingMenu } from "./features/floating-menu/floating-menu";
import { PanoramaProvider } from "./contexts/panorama-context";
import { Home } from "lucide-react";
import { SidebarProvider } from "./contexts/sidebar-context";
import { SidebarUI } from "./components/molecules/sidebar-ui";
import { CompassUI } from "./components/molecules/compass-ui";
import { CompassProvider } from "./contexts/compass-context";

export function Desktop() {
  const [activeScene, setActiveScene] = useState(SCENE_KEYS.v1);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative select-none">
      <GlobalCanvasLoader img="/images/screen.jpg"/>
      <div className="fixed top-12 left-4 z-[70]">
        <FullscreenButton />
      </div>
      
      <div className="w-full h-full relative">
        <CompassProvider>
          <SidebarProvider>
            <PanoramaProvider>
              <CompassUI />
              <PanoramaView 
                scenesData={SCENES} 
                activeSceneKey={activeScene} 
                setActiveScene={setActiveScene} 
              />
              <SidebarUI />
            </PanoramaProvider>
          </SidebarProvider>
        </CompassProvider>
      </div>

      <div className="fixed top-1/2 left-2 -translate-y-1/2 z-50">
        <Tabs value={activeScene} onValueChange={setActiveScene} className="bg-transparent">
          <TabsList className="flex flex-col bg-transparent px-2 gap-2 shadow-2xl">
            <TabsTrigger
              value={SCENE_KEYS.v1}
              className="rounded-full px-2 py-4 bg-black/20 backdrop-blur-xl data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-bold uppercase text-[10px] tracking-[0.2em] transition-all"
            >
              <Home />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <FloatingMenu />
    </div>
  );
}