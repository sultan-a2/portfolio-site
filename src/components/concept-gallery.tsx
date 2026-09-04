"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { LiquidButton, LiquidGlassCard } from "@/components/ui/liquid-glass";
import { cn } from "@/lib/utils";
import type { Concept } from "@/data/concepts";

export function ConceptGallery({ concepts }: { concepts: Concept[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [slide, setSlide] = useState(0);

  const concept = openIndex === null ? null : concepts[openIndex];
  const total = concept?.images.length ?? 0;

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
    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  useEffect(() => {
    if (!concept) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") mainApi?.scrollNext();
      if (event.key === "ArrowLeft") mainApi?.scrollPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [concept, mainApi]);

  const open = (index: number) => {
    setSlide(0);
    setOpenIndex(index);
  };

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
    setOpenIndex(null);
  };

  return (
    <>
      <ul className="concept-index">
        {concepts.map((item, index) => (
          <li key={item.slug}>
            <button type="button" className="concept-row" onClick={() => open(index)}>
              <span className="concept-row-image">
                <Image
                  src={item.images[0].src}
                  alt={item.images[0].alt}
                  width={item.images[0].width}
                  height={item.images[0].height}
                  sizes="84px"
                />
              </span>
              <span className="concept-row-title">{item.title}</span>
              <span className="concept-row-count">{item.images.length}</span>
              <span className="concept-row-arrow">
                <ChevronRight className="size-4" strokeWidth={1.5} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={concept !== null} onOpenChange={(next) => !next && setOpenIndex(null)}>
        {concept ? (
          <DialogContent
            closeLabel="Close this concept"
            onPointerDown={onBackdropPointerDown}
            onClick={onBackdropClick}
          >
            <DialogTitle className="sr-only">{concept.title}</DialogTitle>
            <DialogDescription className="sr-only">
              Image {slide + 1} of {total}. Use the arrow keys to move through the set.
            </DialogDescription>

            <Carousel setApi={setMainApi} opts={{ loop: true }} className="lightbox-stage">
              <CarouselContent className="ml-0 h-full">
                {concept.images.map((image) => (
                  <CarouselItem key={image.src} className="grid place-items-center pl-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="92vw"
                      className="lightbox-image"
                      priority
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
                  {concept.images.map((image, index) => (
                    <CarouselItem key={image.src} className="basis-auto pl-2">
                      <button
                        type="button"
                        className={cn("lightbox-thumb", index === slide && "is-active")}
                        aria-label={`Show ${image.caption}`}
                        aria-current={index === slide}
                        onClick={() => mainApi?.scrollTo(index)}
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
                    <span className="lightbox-title">{concept.title}</span>
                    <span className="lightbox-caption">{concept.images[slide].caption}</span>
                  </span>

                  {total > 1 ? (
                    <span className="lightbox-controls">
                      <LiquidButton
                        variant="ghost"
                        size="icon"
                        onClick={() => mainApi?.scrollPrev()}
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
                        onClick={() => mainApi?.scrollNext()}
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
    </>
  );
}
