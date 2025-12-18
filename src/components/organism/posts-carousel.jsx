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
import { PostCard } from "./post-card";
import { SectionHeader } from "../molecules/section-header";


const PostsCarousel = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const controller = new AbortController();

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
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      }
    };

    fetchPosts();

    return () => controller.abort(); 
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <SectionHeader title="Tin tức dự án" />

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
                  <div class="flex flex-col gap-4">
                    <Skeleton className="h-56 w-64" />
                    <Skeleton className="h-12 w-64" />
                    <Skeleton className="h-24 w-64" />
                  </div>
                </CarouselItem>
              ))
            : posts.map((post) => (
                <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <PostCard post={post} />
                </CarouselItem>
              ))}
        </CarouselContent>
        
        <CarouselPrevious className="hidden md:flex -left-12 bg-black/40 border-white/10 text-white hover:bg-orange-600 hover:text-white" />
        <CarouselNext className="hidden md:flex -right-12 bg-black/40 border-white/10 text-white hover:bg-orange-600 hover:text-white" />
      </Carousel>
    </div>
  );
};

export default PostsCarousel;