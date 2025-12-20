import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export function GlobalCanvasLoader({img = '/images/screen.jpg'}) {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] transition-all duration-1000 bg-cover bg-center ${
        !show ? "opacity-0 scale-110 blur-xl" : "opacity-100 scale-100"
      }`}
      style={{backgroundImage: `url(${img})`}}
    >
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent animate-pulse" />
      </div>

<div className="relative w-screen h-screen">
      <div className="absolute bottom-2/7 left-1/9 md:bottom-8 md:left-[20%] md:translate-x-0 w-40 h-40">
        <div className="relative flex items-center justify-center w-40 h-40">
          <div className="absolute inset-0 border-t-2 border-b-2 border-indigo-500/30 rounded-full animate-[spin_3s_linear_infinite]" />
          <div className="absolute inset-2 border-l-2 border-r-2 border-indigo-400/20 rounded-full animate-[spin_2s_linear_reverse_infinite]" />
          
          <div className="text-center">
            <span className="text-5xl md:text-7xl font-medium text-white tracking-tighter block leading-none">
              {show ? Math.round(progress) - 1 : 100}
            </span>
            <span className="text-sm text-indigo-400 font-bold tracking-[0.4em] uppercase mt-2 block">
              Loading 360
            </span>
          </div>
        </div>

        {/* <div className="mt-12 flex gap-8 text-[9px] text-gray-500 font-mono tracking-widest">
          <div className="flex flex-col items-center">
            <span>FOV: 75°</span>
            <div className="w-8 h-[1px] bg-gray-800 mt-1" />
          </div>
          <div className="flex flex-col items-center">
            <span>AXIS: 360°</span>
            <div className="w-8 h-[1px] bg-gray-800 mt-1" />
          </div>
          <div className="flex flex-col items-center">
            <span>RES: 4K</span>
            <div className="w-8 h-[1px] bg-gray-800 mt-1" />
          </div>
        </div> */}
      </div>
</div>
    </div>
  );
}