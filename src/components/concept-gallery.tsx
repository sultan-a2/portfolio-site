"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { ImageViewer } from "@/components/image-viewer";
import type { Concept } from "@/data/concepts";

export function ConceptGallery({ concepts }: { concepts: Concept[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const concept = openIndex === null ? null : concepts[openIndex];

  return (
    <>
      <ul className="concept-index">
        {concepts.map((item, index) => (
          <li key={item.slug}>
            <button type="button" className="concept-row" onClick={() => setOpenIndex(index)}>
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

      <ImageViewer
        title={concept?.title ?? ""}
        images={concept?.images ?? null}
        open={concept !== null}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}
