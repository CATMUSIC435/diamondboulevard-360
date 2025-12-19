"use client";

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
import { useFetchPosts } from "../../hooks/use-fetch-posts";


const PostsCarousel = () => {
const { posts, loading } = useFetchPosts(8);

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