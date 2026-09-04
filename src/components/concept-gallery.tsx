"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

import { ImageViewer } from "@/components/image-viewer";
import { playSound } from "@/lib/sound";
import type { Concept } from "@/data/concepts";

export function ConceptGallery({ concepts, limit }: { concepts: Concept[]; limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shown = limit ? concepts.slice(0, limit) : concepts;
  const concept = openIndex === null ? null : concepts[openIndex];

  return (
    <>
      <ul className="concept-index">
        {shown.map((item, index) => (
          <li key={item.slug}>
            <button type="button" className="concept-row" onClick={() => {
                playSound("transition", 0.3);
                setOpenIndex(index);
              }}>
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

        {limit && concepts.length > limit ? (
          <li>
            <Link href="/concepts" className="concept-row concept-row-all" onClick={() => playSound("tap")}>
              <span className="concept-row-title">All concepts</span>
              <span className="concept-row-arrow">
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </span>
            </Link>
          </li>
        ) : null}
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
