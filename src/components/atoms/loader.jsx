import { Html, useProgress } from "@react-three/drei";

export function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-black/50 p-6 rounded-2xl backdrop-blur-md border border-white/20">
        <div className="w-48 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-500 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white mt-3 font-bold text-sm tracking-widest">
          LOADING {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}