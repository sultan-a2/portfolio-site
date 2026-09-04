"use client";

import { useState } from "react";
import Image from "next/image";

import { ImageViewer } from "@/components/image-viewer";
import type { ViewerImage } from "@/components/image-viewer";
import { playSound } from "@/lib/sound";

export function OneOffRail({ images }: { images: ViewerImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // The viewer starts on its first slide, so hand it the clicked one first.
  const ordered = openIndex === null ? images : [...images.slice(openIndex), ...images.slice(0, openIndex)];

  // The track holds the run twice so the loop meets itself.
  const run = [...images, ...images];

  const open = (index: number) => {
    playSound("transition", 0.3);
    setOpenIndex(index);
  };

  return (
    <>
      <div className="one-off-rail">
        <div className="one-off-track">
          {run.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className="one-off"
              aria-hidden={index >= images.length}
              tabIndex={index >= images.length ? -1 : 0}
              onClick={() => open(index % images.length)}
            >
              <Image
                src={image.src}
                alt={index >= images.length ? "" : image.alt}
                width={image.width}
                height={image.height}
                sizes="340px"
              />
            </button>
          ))}
        </div>
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
