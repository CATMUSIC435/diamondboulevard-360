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
import { HelpCircle, Newspaper, Map } from "lucide-react";
import { Mapbox } from "../map-box";

const MENU_ITEMS = [
  {
    id: "new",
    label: "New",
    icon: <Newspaper size={20} />,
    content: (
      <PostsCarousel />
    ),
  },
  {
    id: "Map",
    label: "Map",
    icon: <Map size={20} />,
    content: (
      <Mapbox />
    ),
  },
  {
    id: "help",
    label: "Help",
    icon: <HelpCircle size={20} />,
    content: (
      <ul className="text-sm space-y-2 list-disc pl-4 text-gray-300">
        <li>Giữ chuột trái và kéo để xoay góc nhìn.</li>
        <li>Sử dụng con lăn chuột để phóng to/thu nhỏ.</li>
        <li>Nhấn vào các Hotspot để chuyển cảnh hoặc xem thông tin.</li>
      </ul>
    ),
  },
];

export function FloatingMenu() {
  return (
    <div className="fixed bottom-4 left-[50%] -translate-x-1/2 z-[70] flex gap-2 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl">
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
          <DialogContent className="sm:max-w-6xl bg-black/20 backdrop-blur-2xl border-white/10 text-white">            
            {item.content}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}