"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// 1. Define your sections and background images
const SECTIONS = [
  {
    id: 1,
    title: "The Deep Forest",
    description: "Venture into the lush, untamed wilderness.",
    image: "/bg2.webp",
  },
  {
    id: 2,
    title: "The Quiet Mountains",
    description: "Ascend to the snowy peaks and find peace.",
    image: "/bg4.jpg",
  },
  {
    id: 3,
    title: "The Endless Ocean",
    description: "Discover the depths of the blue abyss.",
    image: "/bg3.jpg",
  },
];

type Section = { id: number; title: string; description: string; image: string };

function BackgroundSection({ section, index, scrollYProgress }: {
  section: Section;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = (index - 1) / (SECTIONS.length - 1);
  const center = index / (SECTIONS.length - 1);
  const end = (index + 1) / (SECTIONS.length - 1);

  const opacity = useTransform(
    scrollYProgress,
    [start, center, end],
    [0, 1, 0]
  );

  return (
    <motion.div
      key={section.id}
      className="absolute inset-0 w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${section.image})`,
        opacity,
      }}
    >
      {/* Optional: Dark overlay to make text readable */}
      <div className="absolute inset-0 bg-black/40" />
    </motion.div>
  );
}

export default function ScrollBackgrounds() {
  // 2. Attach a ref to the outer container to track scroll progress
  const containerRef = useRef(null);

  // 3. Track the scroll progress of the container
  // scrollYProgress will be a value between 0 (top) and 1 (bottom)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full" 
      // Height dynamically scales based on number of sections
      style={{ height: `${SECTIONS.length * 100}vh` }}
    >
      {/* STICKY BACKGROUND CONTAINER
        This div stays pinned to the screen while you scroll through the tall container above 
      */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        {SECTIONS.map((section, index) => (
          <BackgroundSection 
            key={section.id}
            section={section} 
            index={index} 
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* SCROLLING CONTENT 
        This sits on top of the sticky background and actually scrolls
      */}
      <div className="absolute top-0 left-0 w-full">
        {SECTIONS.map((section) => (
          <div
        
            key={`content-${section.id}`}
            className="flex h-screen w-full flex-col items-center justify-center text-center text-white px-4"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg">
              {section.title}
            </h2>
            <p className="text-xl md:text-2xl max-w-2xl drop-shadow-md">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}