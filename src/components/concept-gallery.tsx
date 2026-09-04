"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Concept } from "@/data/concepts";

export function ConceptGallery({ concepts }: { concepts: Concept[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  const concept = openIndex === null ? null : concepts[openIndex];
  const total = concept?.images.length ?? 0;

  const go = useCallback(
    (step: number) => {
      if (!total) return;
      setSlide((current) => (current + step + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (!concept) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [concept, go]);

  const open = (index: number) => {
    setSlide(0);
    setOpenIndex(index);
  };

  return (
    <>
      <div className="study-shelf">
        {concepts.map((item, index) => (
          <figure key={item.slug}>
            <button type="button" className="concept-tile" onClick={() => open(index)}>
              <span className="concept-tile-image">
                <Image
                  src={item.images[0].src}
                  alt={item.images[0].alt}
                  width={item.images[0].width}
                  height={item.images[0].height}
                  sizes="(max-width: 680px) 70vw, 290px"
                />
              </span>
              <span className="concept-tile-count">{item.images.length}</span>
            </button>
            <figcaption>{item.title}</figcaption>
          </figure>
        ))}
      </div>

      <Dialog open={concept !== null} onOpenChange={(next) => !next && setOpenIndex(null)}>
        {concept ? (
          <DialogContent closeLabel="Close this concept">
            <DialogTitle className="sr-only">{concept.title}</DialogTitle>
            <DialogDescription className="sr-only">
              Image {slide + 1} of {total}. Use the arrow keys to move through the set.
            </DialogDescription>

            <div className="lightbox-stage">
              <Image
                key={concept.images[slide].src}
                src={concept.images[slide].src}
                alt={concept.images[slide].alt}
                width={concept.images[slide].width}
                height={concept.images[slide].height}
                sizes="92vw"
                className="lightbox-image"
                priority
              />
            </div>

            <div className="lightbox-bar">
              <div className="lightbox-meta">
                <span className="lightbox-title">{concept.title}</span>
                <span className="lightbox-caption">{concept.images[slide].caption}</span>
              </div>

              {total > 1 ? (
                <div className="lightbox-controls">
                  <Button variant="ghost" size="icon" onClick={() => go(-1)} aria-label="Previous image">
                    <ChevronLeft className="size-5" strokeWidth={1.5} />
                  </Button>
                  <span className="lightbox-count">
                    {slide + 1} / {total}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => go(1)} aria-label="Next image">
                    <ChevronRight className="size-5" strokeWidth={1.5} />
                  </Button>
                </div>
              ) : null}
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}
