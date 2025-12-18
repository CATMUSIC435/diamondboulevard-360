"use client";
import { createContext, useContext, useState } from "react";

const PanoramaContext = createContext(null);

export function PanoramaProvider({ children }) {
  const [sceneReady, setSceneReady] = useState(false);

  return (
    <PanoramaContext.Provider value={{ sceneReady, setSceneReady }}>
      {children}
    </PanoramaContext.Provider>
  );
}

export function usePanorama() {
  const ctx = useContext(PanoramaContext);
  if (!ctx) {
    throw new Error("usePanorama must be used inside PanoramaProvider");
  }
  return ctx;
}
