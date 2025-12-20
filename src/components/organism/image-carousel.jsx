import * as React from "react"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export function ImageCarousel({ images }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <div className="flex justify-center w-full px-2">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-4xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="p-1">
                <Card className="overflow-hidden border-none shadow-lg bg-transparent">
                  <CardContent className="flex items-center justify-center p-0 aspect-video">
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-12 bg-black/50 border-white/20 text-white" />
        <CarouselNext className="-right-12 bg-black/50 border-white/20 text-white" />
      </Carousel>
    </div>
  )
}