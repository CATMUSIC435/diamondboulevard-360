"use client";

import PostsCarousel from "../../components/organism/posts-carousel";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  // DialogDescription,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Newspaper, Map, GalleryThumbnails, GalleryHorizontalIcon } from "lucide-react";
import { Mapbox } from "../map-box";
// import { WebFrame } from "../../components/organism/web-frame";
import { YoutubeShortsCarousel } from "../../components/organism/youtube-shorts-carousel";
import { ImageCarousel } from "../../components/organism/image-carousel";
import { memo } from "react";
import { MY_IMAGES } from "../../constant";

const MENU_ITEMS_SMALL = [    
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
    icon: <GalleryHorizontalIcon size={20} />,
    content: (
      <YoutubeShortsCarousel />
    ),
  },  
  {
    id: "galery",
    label: "Galery",
    icon: <GalleryThumbnails size={20} />,
    content: (
      <ImageCarousel images={MY_IMAGES} />
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

const MENU_ITEMS_LARGE = [     
  {
    id: "galery",
    label: "Galery",
    icon: <GalleryThumbnails size={20} />,
    content: (
      <ImageCarousel images={MY_IMAGES} />
    ),
  },
];

export const FloatingMenu = memo(({isLarge = false}) => {
  const MENU_ITEMS = isLarge ? MENU_ITEMS_LARGE : MENU_ITEMS_SMALL;
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
          <DialogTitle className="hidden">
            </DialogTitle>    
            {item.content}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
})
