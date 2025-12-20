import { memo } from "react";

export const SceneTransitionOverlay = memo(({ isTransitioning }) => {
  return (
    <div 
      className={`fixed inset-0 z-[100] transition-all duration-700 ease-in-out flex flex-col items-center justify-center pointer-events-none
        ${isTransitioning ? "opacity-100 backdrop-blur-md" : "opacity-0 backdrop-blur-0"}`}
    >
      <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/20 via-black/80 to-black/20" />
      
      <div className="relative flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-white/10 border-t-orange-500 rounded-full animate-spin" />
        
        <div className="flex flex-col items-center">
          <span className="text-white text-[9px] tracking-[0.5em] font-light uppercase opacity-60">
            Đang chuyển cảnh
          </span>
          <div className="mt-4 w-32 h-[1px] bg-white/5 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-[1500ms]
                ${isTransitioning ? "w-full" : "w-0"}`} 
            />
          </div>
        </div>
      </div>
    </div>
  );
});