"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import {Skeleton } from "../ui/skeleton"


const PostsCarousel = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const controller = new AbortController();

        setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://diamondboulevard.com.vn/wp-json/wp/v2/posts?per_page=8",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Lỗi lấy bài viết:", err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    return () => controller.abort(); // Cleanup function
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
            Tin tức dự án
          </h2>
          <div className="h-1 w-10 bg-orange-500 mt-1" />
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Skeleton className="h-56 w-32 rounded-full" />
                </CarouselItem>
              ))
            : posts.map((post) => (
                <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group relative h-full flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-orange-500/50">
                    
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] duration-1000 transition-transform" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl">
                        <img
                          src={post.yoast_head_json?.["og_image"]?.[0]?.url}
                          alt={post.title.rendered}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <h3
                        className="mb-3 line-clamp-2 text-lg font-bold text-white group-hover:text-orange-600 transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />

                      <div
                        className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-400"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />

                      <div className="mt-auto pt-4 border-t border-white/5">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-orange-600 hover:text-orange-300 transition-colors"
                        >
                          Đọc thêm 
                          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
        
        {/* Nút điều hướng custom phong cách VR */}
        <CarouselPrevious className="hidden md:flex -left-12 bg-black/40 border-white/10 text-white hover:bg-orange-600 hover:text-white" />
        <CarouselNext className="hidden md:flex -right-12 bg-black/40 border-white/10 text-white hover:bg-orange-600 hover:text-white" />
      </Carousel>
    </div>
  );
};

export default PostsCarousel;