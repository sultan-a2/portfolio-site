"use client";

import { useState } from "react";
import Image from "next/image";

import { ImageViewer } from "@/components/image-viewer";
import type { ViewerImage } from "@/components/image-viewer";

export function OneOffGrid({ images }: { images: ViewerImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // The viewer starts on its first slide, so hand it the clicked one first.
  const ordered = openIndex === null ? images : [...images.slice(openIndex), ...images.slice(0, openIndex)];

  return (
    <>
      <div className="one-off-grid">
        {images.map((image, index) => (
          <button key={image.src} type="button" className="one-off" onClick={() => setOpenIndex(index)}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 680px) 44vw, 190px"
            />
            {/* The square crop hides most of a wide piece, so hovering shows it whole. */}
            <span className="one-off-full" aria-hidden="true">
              <Image
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                sizes="440px"
                className="one-off-full-image"
              />
              <span className="one-off-full-caption">{image.caption}</span>
            </span>
          </button>
        ))}
      </div>

      <ImageViewer
        title="One-offs"
        images={ordered}
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}
