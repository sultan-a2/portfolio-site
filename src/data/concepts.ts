export type ConceptImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type Concept = {
  slug: string;
  title: string;
  images: ConceptImage[];
};

export const concepts: Concept[] = [
  {
    slug: "prostasia",
    title: "Prostasía",
    images: [
      {
        src: "/concepts/prostasia/home.webp",
        alt: "Prostasía landing page with two glowing eye shapes in the dark",
        width: 1471,
        height: 802,
        caption: "Landing",
      },
      {
        src: "/concepts/prostasia/mission.webp",
        alt: "Prostasía mission page: nobody needs to know you were here",
        width: 1551,
        height: 802,
        caption: "Mission",
      },
      {
        src: "/concepts/prostasia/how-it-works.webp",
        alt: "Prostasía how it works page with a tracked figure and route status",
        width: 1471,
        height: 802,
        caption: "How it works",
      },
      {
        src: "/concepts/prostasia/case-board.webp",
        alt: "Prostasía case board showing the three pages together",
        width: 1920,
        height: 1080,
        caption: "The three pages together",
      },
    ],
  },
  {
    slug: "under-the-star",
    title: "Under the star",
    images: [
      {
        src: "/concepts/under-the-star/wide-reader.webp",
        alt: "Painted scene of a robed reader on a hillside under a deep blue night sky",
        width: 2400,
        height: 1355,
        caption: "A reader on the ridge",
      },
      {
        src: "/concepts/under-the-star/books-hero.webp",
        alt: "Reading site hero built on the painted reader, set on a blue and magenta wash",
        width: 1800,
        height: 1034,
        caption: "Reading site, hero",
      },
      {
        src: "/concepts/under-the-star/navbar.webp",
        alt: "Reading site hero with a full-bleed navigation bar over the night sky",
        width: 1440,
        height: 1440,
        caption: "Reading site, navigation",
      },
      {
        src: "/concepts/under-the-star/reader-close.webp",
        alt: "Closer painted view of the robed reader holding a green book",
        width: 1024,
        height: 1024,
        caption: "The green book",
      },
      {
        src: "/concepts/under-the-star/reader-star.webp",
        alt: "Painted reader beneath a cross-shaped star and a field of stars",
        width: 1024,
        height: 1024,
        caption: "Reading by starlight",
      },
      {
        src: "/concepts/under-the-star/garden-piano.webp",
        alt: "Embroidered garden scene with waterfalls, a white dragon, and a blue piano",
        width: 1024,
        height: 1024,
        caption: "The garden and the piano",
      },
    ],
  },
];
