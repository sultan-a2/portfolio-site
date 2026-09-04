"use client";

import { useState } from "react";
import { Image01Icon, StarIcon } from "@hugeicons/core-free-icons";

import TravelCard from "@/components/craftui/travel-card";
import { ImageViewer } from "@/components/image-viewer";
import { playSound } from "@/lib/sound";
import type { Concept } from "@/data/concepts";

export function ConceptCards({ concepts }: { concepts: Concept[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const concept = openIndex === null ? null : concepts[openIndex];

  return (
    <>
      <div className="concept-cards">
        {concepts.map((item, index) => (
          <TravelCard
            key={item.slug}
            imageUrl={item.images[0].src}
            imageAlt={item.images[0].alt}
            title={item.title}
            description={item.images.map((image) => image.caption).join(" · ")}
            price={`${item.images.length} images`}
            availabilityText={item.images[0].caption}
            tagText="Concept"
            tagIcon={StarIcon}
            flightIcon={Image01Icon}
            exploreLabel="Explore"
            addToCartLabel="Open the set"
            onAddToCart={() => {
              playSound("transition", 0.3);
              setOpenIndex(index);
            }}
          />
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
