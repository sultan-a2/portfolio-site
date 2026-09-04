export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectBlock =
  | { type: "image"; image: ProjectImage; caption?: string }
  | { type: "pair"; images: [ProjectImage, ProjectImage]; caption?: string }
  | { type: "video"; src: string; poster?: string; width: number; height: number; caption?: string };

export type Project = {
  slug: string;
  name: string;
  discipline: string;
  context?: string;
  intro: string;
  cover: ProjectImage;
  liveUrl?: string;
  blocks: ProjectBlock[];
};

export const projects: Project[] = [
  {
    slug: "7-2",
    name: "7/2",
    discipline: "Product design",
    context: "Independent concept",
    intro: "I’m building 7/2 for dates in the UAE that actually feel worth remembering.",
    cover: { src: "/work/7-2/hero.png", alt: "7/2 date discovery website interface", width: 803, height: 636 },
    blocks: [
      { type: "image", image: { src: "/work/7-2/hero.png", alt: "7/2 home and date filter interface", width: 803, height: 636 }, caption: "Current direction" },
      { type: "pair", images: [
        { src: "/work/7-2/image-studies.png", alt: "Generated visual studies for the 7/2 identity", width: 1440, height: 1120 },
        { src: "/work/7-2/principles.png", alt: "7/2 product principles: fresh, curated, planned", width: 795, height: 637 },
      ], caption: "Visual studies and product principles" },
      { type: "image", image: { src: "/work/7-2/early-01.png", alt: "Early 7/2 landing page direction with colorful characters", width: 1440, height: 900 }, caption: "Early direction" },
      { type: "pair", images: [
        { src: "/work/7-2/early-02.png", alt: "Early modular 7/2 date discovery interface", width: 1440, height: 1100 },
        { src: "/work/7-2/early-03.png", alt: "Early soft-focus 7/2 landing page direction", width: 1440, height: 900 },
      ], caption: "The early versions helped me find the final direction" },
    ],
  },
  {
    slug: "wayfarer",
    name: "Wayfarer",
    discipline: "Web design + development",
    context: "Personal project",
    intro: "I’m a big fan of xianxia, stories where mortals become immortals, so I’m building a niche home for readers.",
    cover: { src: "/work/wayfarer/live-hero.webp", alt: "Wayfarer home page, a halftone deer leaping across a blue field", width: 1600, height: 1000 },
    liveUrl: "https://wayfarer-five-hazel.vercel.app/",
    blocks: [
      { type: "image", image: { src: "/work/wayfarer/hero.png", alt: "Wayfarer home page with a halftone white deer", width: 1280, height: 800 }, caption: "A home for readers of xianxia, xuanhuan, and wuxia" },
      { type: "video", src: "/work/wayfarer/walkthrough.mp4", poster: "/work/wayfarer/hero.png", width: 1280, height: 612, caption: "Website walkthrough" },
      { type: "pair", images: [
        { src: "/work/wayfarer/wiki.webp", alt: "Wayfarer wiki home with a search field and category tiles", width: 1600, height: 1000 },
        { src: "/work/wayfarer/wiki-nuwa.webp", alt: "The Nüwa wiki page with a woodcut of her repairing the sky", width: 1600, height: 1000 },
      ], caption: "The wiki, and one of its pages" },
      { type: "image", image: { src: "/work/wayfarer/art.png", alt: "Blue monochrome deer artwork for Wayfarer", width: 1672, height: 941 }, caption: "Visual direction" },
    ],
  },
  {
    slug: "nargis-raza",
    name: "Nargis Raza",
    discipline: "Web design",
    intro: "A personal site for transpersonal psychologist Nargis Raza.",
    cover: { src: "/work/nargis/live-hero.webp", alt: "Nargis Raza home page, helping you come back to yourself", width: 1600, height: 1000 },
    liveUrl: "https://nargis-raza-website.vercel.app/",
    blocks: [
      { type: "image", image: { src: "/work/nargis/hero.png", alt: "Nargis Raza website hero about freeing the feminine spirit", width: 1637, height: 834 }, caption: "Home page" },
      { type: "pair", images: [
        { src: "/work/nargis/about.png", alt: "Nargis Raza website about page", width: 805, height: 768 },
        { src: "/work/nargis/work.png", alt: "Nargis Raza one-to-one work page", width: 1013, height: 810 },
      ], caption: "About and ways of working" },
      { type: "image", image: { src: "/work/nargis/texture.jpeg", alt: "Soft abstract color texture used across the Nargis Raza website", width: 1800, height: 1016 }, caption: "Atmosphere and visual texture" },
    ],
  },
  {
    slug: "suzanne-saleh",
    name: "Suzanne Saleh",
    discipline: "Print + web design",
    intro: "Print and the live site for Suzanne Saleh’s midlife wellness practice.",
    cover: { src: "/work/suzanne-saleh/live-hero.webp", alt: "Suzanne Saleh home page, let’s make midlife a little less complicated", width: 1600, height: 1000 },
    liveUrl: "https://suzannesaleh.com/",
    blocks: [
      { type: "image", image: { src: "/work/suzanne-saleh/hero.png", alt: "Suzanne Saleh home page, let’s make midlife a little less complicated", width: 1600, height: 1000 }, caption: "Home page" },
      { type: "video", src: "/work/suzanne-saleh/walkthrough.mp4", width: 1280, height: 603, caption: "Website walkthrough" },
      { type: "pair", images: [
        { src: "/work/suzanne-saleh/flyer-01.png", alt: "Suzanne Saleh holistic wellness services flyer", width: 1080, height: 1532 },
        { src: "/work/suzanne-saleh/flyer-02.png", alt: "Suzanne Saleh midlife wellness flyer", width: 1080, height: 1532 },
      ], caption: "A5 print pieces" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
