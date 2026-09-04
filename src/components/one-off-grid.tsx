"use client";

import { useState } from "react";
import Image from "next/image";

import { ImageViewer } from "@/components/image-viewer";
import type { ViewerImage } from "@/components/image-viewer";

export function OneOffGrid({ images }: { images: ViewerImage[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="one-off-grid">
        {images.map((image) => (
          <button key={image.src} type="button" className="one-off" onClick={() => setOpen(true)}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 680px) 44vw, 190px"
            />
          </button>
        ))}
      </div>

      <ImageViewer title="One-offs" images={images} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
