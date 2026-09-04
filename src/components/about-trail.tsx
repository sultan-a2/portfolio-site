"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { CursorImageTrail } from "@/components/ui/cursor-image-trail";
import { photos } from "@/data/photos";

const items: ReactNode[] = photos.map((photo) => (
  <Image
    key={photo.src}
    src={photo.src}
    alt=""
    width={photo.width}
    height={photo.height}
    sizes="180px"
    className="about-trail-image"
  />
));

export function AboutTrail({ children }: { children: ReactNode }) {
  return (
    <CursorImageTrail items={items} itemSize={180} trailLength={6} spawnDistance={110} className="about-trail">
      {children}
    </CursorImageTrail>
  );
}
