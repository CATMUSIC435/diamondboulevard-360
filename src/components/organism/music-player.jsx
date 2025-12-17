import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Music, ChevronLeft, Volume2 } from 'lucide-react';

const PLAYLIST = [
  { id: 3, title: "Phép màu", artist: "MAYDAYs, Minh Tốc", url: "/musics/phep-mau.mp3" }
];

export function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

useEffect(() => {
  if (audioRef.current) {
    audioRef.current.load(); 
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Phát thành công
          })
          .catch((error) => {
            console.error("Autoplay bị chặn hoặc lỗi tải nhạc:", error);
            setIsPlaying(false);
          });
      }
    }
  }
}, [currentTrackIndex]);

  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col items-end gap-2">
      <div 
        onClick={() => !isExpanded && setIsExpanded(true)}
        className={`relative flex items-center gap-4 overflow-hidden rounded-full p-1.5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isExpanded ? "w-80 px-4 py-3 rounded-2xl bg-black/40" : "w-[52px] cursor-pointer"
        }`}
      >
        
        <div className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg ${isPlaying ? 'animate-spin-slow' : ''}`}>
          <Music size={18} />
          
          {isPlaying && (
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          )}
        </div>
        <div className={`flex flex-1 flex-col overflow-hidden transition-all duration-500 ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"}`}>
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h4 className="truncate text-xs font-bold text-white tracking-wide uppercase">
                {PLAYLIST[currentTrackIndex].title}
              </h4>
              <p className="text-[10px] text-gray-400 font-medium">
                {PLAYLIST[currentTrackIndex].artist}
              </p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
              className="rounded-full p-1 hover:bg-white/10 text-white/50 hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-4 text-white/80">
              <button onClick={(e) => { e.stopPropagation(); togglePlay(e); }}>
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>
              <button onClick={(e) => { e.stopPropagation(); setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length); }}>
                <SkipForward size={18} />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
                <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full bg-indigo-500 transition-all ${isPlaying ? 'w-1/2' : 'w-0'}`} />
                </div>
                <Volume2 size={14} className="text-white/40" />
            </div>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="w-64 rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-500">
          <p className="px-2 py-1 text-[9px] font-bold text-indigo-400 uppercase tracking-widest border-b border-white/5 mb-1">
            Up Next
          </p>
          {PLAYLIST.map((track, index) => (
            <button 
              key={track.id}
              onClick={() => setCurrentTrackIndex(index)}
              className={`w-full flex justify-between items-center rounded-lg px-3 py-2 text-[10px] transition-all ${
                currentTrackIndex === index ? 'bg-indigo-600/30 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{track.title}</span>
              {currentTrackIndex === index && <span className="h-1 w-1 rounded-full bg-indigo-400 animate-pulse" />}
            </button>
          ))}
        </div>
      )}

      <audio ref={audioRef} src={PLAYLIST[currentTrackIndex].url} />

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}