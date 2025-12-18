"use client";

import PostsCarousel from "../../components/organism/posts-carousel";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Newspaper, Map, Home, Video, Clipboard } from "lucide-react";
import { Mapbox } from "../map-box";
import { WebFrame } from "../../components/organism/web-frame";
import { YoutubeShortsCarousel } from "../../components/organism/youtube-shorts-carousel";

const MENU_ITEMS = [    
  // {
  //   id: "home",
  //   label: "Home",
  //   icon: <Home size={20} />,
  //   content: (
  //     <WebFrame url="https://diamondboulevard.com.vn/" title="Diamond Boulevard Official" />
  //   ),
  // },
  {
    id: "Map",
    label: "Map",
    icon: <Map size={20} />,
    content: (
      <Mapbox />
    ),
  },  
  {
    id: "video",
    label: "Video",
    icon: <Clipboard size={20} />,
    content: (
      <YoutubeShortsCarousel />
    ),
  },
   {
    id: "new",
    label: "New",
    icon: <Newspaper size={20} />,
    content: (
      <PostsCarousel />
    ),
  },
];

export function FloatingMenu() {
  return (
    <div className="fixed bottom-4 left-[50%] -translate-x-1/2 z-[70] flex gap-2 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl select-none">
      {MENU_ITEMS.map((item) => (
        <Dialog key={item.id}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              title={item.label}
            >
              {item.icon}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-6xl bg-black/20 backdrop-blur-2xl border-white/10 text-white p-0">            
            {item.content}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}