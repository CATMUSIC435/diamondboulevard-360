"use client";

import { useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card } from "../ui/card";
import { Play } from "lucide-react";

const SHORTS = [
  "https://www.youtube.com/shorts/Nf2cr8iBEb0",
];


const getEmbedUrl = (url) => {
  const videoId = url.split("/").pop()?.split("?")[0];
  return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&playsinline=1&modestbranding=1`;
};

export function YoutubeShortsCarousel() {
  const iframeRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const pauseAll = () => {
    iframeRefs.current.forEach((iframe) => {
      if (!iframe) return;
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo" }),
        "*"
      );
    });
  };

  const handlePlay = (index) => {
    pauseAll();
    setActiveIndex(index);

    iframeRefs.current[index]?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "playVideo" }),
      "*"
    );
  };

  return (
    <div className="mx-auto max-w-sm">
      <Carousel opts={{ align: "center" }} className="w-full">
        <CarouselContent>
          {SHORTS.map((src, index) => (
            <CarouselItem key={index} className="basis-full">
              <Card className="relative overflow-hidden rounded-2xl border-white/10 bg-black aspect-[9/16]">
                <iframe
                  ref={(el) => (iframeRefs.current[index] = el)}
                  src={getEmbedUrl(src)}
                  className="h-full w-full pointer-events-none"
                  allow="autoplay; encrypted-media"
                  style={{ pointerEvents: activeIndex === index ? 'auto' : 'none' }}
                />

                {activeIndex !== index && (
                  <div 
                    onClick={() => handlePlay(index)}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer group transition-all"
                  >
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-white/20 border border-white/40 group-hover:scale-110 group-hover:bg-indigo-500 transition-all">
                      <Play fill="white" className="text-white ml-1" />
                    </div>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-white/70">
                      Click to Play
                    </p>
                  </div>
                )}
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 bg-black/50 border-white/20 text-white" />
        <CarouselNext className="right-2 bg-black/50 border-white/20 text-white" />
      </Carousel>
    </div>
  );
}