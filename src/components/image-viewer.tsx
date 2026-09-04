"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { LiquidButton, LiquidGlassCard } from "@/components/ui/liquid-glass";
import { cn } from "@/lib/utils";

export type ViewerImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export function ImageViewer({
  title,
  images,
  open,
  onClose,
}: {
  title: string;
  images: ViewerImage[] | null;
  open: boolean;
  onClose: () => void;
}) {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [slide, setSlide] = useState(0);

  const total = images?.length ?? 0;

  const onSelect = useCallback(() => {
    if (!mainApi) return;
    const index = mainApi.selectedScrollSnap();
    setSlide(index);
    thumbApi?.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    mainApi.on("settle", onSelect);
    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
      mainApi.off("settle", onSelect);
    };
  }, [mainApi, onSelect]);

  const step = useCallback(
    (direction: 1 | -1) => {
      if (direction === 1) mainApi?.scrollNext();
      else mainApi?.scrollPrev();
    },
    [mainApi],
  );

  const jumpTo = useCallback((index: number) => mainApi?.scrollTo(index), [mainApi]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  // Clicking the empty space around the image closes, but a drag must not.
  const pressPoint = useRef<{ x: number; y: number } | null>(null);

  const onBackdropPointerDown = (event: React.PointerEvent) => {
    pressPoint.current = { x: event.clientX, y: event.clientY };
  };

  const onBackdropClick = (event: React.MouseEvent) => {
    const start = pressPoint.current;
    pressPoint.current = null;
    if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) return;
    if ((event.target as HTMLElement).closest("img, button, a, .lightbox-glass")) return;
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      {images ? (
        <DialogContent
          closeLabel={`Close ${title}`}
          onPointerDown={onBackdropPointerDown}
          onClick={onBackdropClick}
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Image {slide + 1} of {total}. Use the arrow keys to move through the set.
          </DialogDescription>

          <Carousel
            setApi={setMainApi}
            opts={{ loop: true, duration: 16 }}
            className="lightbox-stage"
          >
            <CarouselContent className="ml-0 h-full">
              {images.map((image) => (
                <CarouselItem key={image.src} className="grid place-items-center pl-0">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="92vw"
                    className="lightbox-image"
                    priority
                    loading="eager"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {total > 1 ? (
            <Carousel
              setApi={setThumbApi}
              opts={{ containScroll: "keepSnaps", dragFree: true }}
              className="lightbox-strip"
            >
              <CarouselContent className="-ml-2 justify-center">
                {images.map((image, index) => (
                  <CarouselItem key={image.src} className="basis-auto pl-2">
                    <button
                      type="button"
                      className={cn("lightbox-thumb", index === slide && "is-active")}
                      aria-label={`Show ${image.caption}`}
                      aria-current={index === slide}
                      onClick={() => jumpTo(index)}
                    >
                      <Image src={image.src} alt="" width={image.width} height={image.height} sizes="90px" />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : null}

          <div className="lightbox-bar">
            <LiquidGlassCard glassSize="sm" className="lightbox-glass">
              <div className="lightbox-glass-inner">
                <span className="lightbox-meta">
                  <span className="lightbox-title">{title}</span>
                  <span className="lightbox-caption">{images[slide]?.caption}</span>
                </span>

                {total > 1 ? (
                  <span className="lightbox-controls">
                    <LiquidButton
                      variant="ghost"
                      size="icon"
                      onClick={() => step(-1)}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="size-5" strokeWidth={1.5} />
                    </LiquidButton>
                    <span className="lightbox-count">
                      {slide + 1} / {total}
                    </span>
                    <LiquidButton
                      variant="ghost"
                      size="icon"
                      onClick={() => step(1)}
                      aria-label="Next image"
                    >
                      <ChevronRight className="size-5" strokeWidth={1.5} />
                    </LiquidButton>
                  </span>
                ) : null}
              </div>
            </LiquidGlassCard>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
