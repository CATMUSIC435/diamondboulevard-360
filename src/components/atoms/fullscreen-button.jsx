"use client";

import React, { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

export function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Theo dõi sự kiện thay đổi fullscreen của trình duyệt (ví dụ nhấn ESC)
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable fullscreen: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="p-1.5 md:p-1 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 shadow-2xl group"
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {isFullscreen ? (
        <Minimize size={20} className="group-hover:text-indigo-400" />
      ) : (
        <Maximize size={20} className="group-hover:text-indigo-400" />
      )}
    </button>
  );
}