import { Html } from "@react-three/drei";

export function SceneTransition({ isChanging }) {
  return (
    <Html fullscreen>
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-700 pointer-events-none
          ${isChanging ? "opacity-100" : "opacity-0"}`} 
      />
    </Html>
  );
}