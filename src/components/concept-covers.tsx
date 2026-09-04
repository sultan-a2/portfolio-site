"use client";

import { useState } from "react";
import Image from "next/image";

import { ImageViewer } from "@/components/image-viewer";
import type { Concept } from "@/data/concepts";

export function ConceptCovers({ concepts }: { concepts: Concept[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const concept = openIndex === null ? null : concepts[openIndex];

  return (
    <>
      <div className="concept-covers">
        {concepts.map((item, index) => (
          <figure key={item.slug}>
            <button type="button" className="concept-cover" onClick={() => setOpenIndex(index)}>
              <span className="concept-cover-image">
                <Image
                  src={item.images[0].src}
                  alt={item.images[0].alt}
                  width={item.images[0].width}
                  height={item.images[0].height}
                  sizes="(max-width: 680px) 46vw, 300px"
                />
                <span className="concept-cover-count">{item.images.length}</span>
              </span>
            </button>
            <figcaption>{item.title}</figcaption>
          </figure>
        ))}
      </div>

      <ImageViewer
        title={concept?.title ?? ""}
        images={concept?.images ?? null}
        open={concept !== null}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}
