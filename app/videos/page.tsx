"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play, X, Eye, Clock, Award, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Archivo, Space_Grotesk, Lato } from "next/font/google";
import Image from "next/image";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

type Video = {
  id: number;
  title: string;
  category: string;
  src: string;
  duration: string;
  featured: boolean;
  thumbnail?: string;
};

const videos: Video[] = [
  {
    id: 1,
    title: "Bombtrack",
    category: "Music Video",
    src: "/videos/Bombtrack.webm",
    duration: "4:32",
    featured: true,
  },
  // {
  //   id: 3,
  //   title: "DISSTRACK",
  //   category: "Music Video",
  //   src: "/DISSTRACK.mp4",
  //   duration: "3:10",
  //   featured: true,
  // },
  {
    id: 2,
    title: "Feeling So Lost Teaser",
    category: "Teaser",
    src: "/videos/Feeling So Lost Teaser.webm",
    duration: "0:45",
    featured: false,
    thumbnail: "/feelingsolostthumbnail.jpg",
  },
  {
    id: 4,
    title: "Fly As Me (Bruno Mars) Cover",
    category: "Music Video",
    src: "/leona 4.webm",
    duration: "5:20",
    featured: false,
    thumbnail: "/thumbnail.jpg",
  },
  // {
  //   id: 5,
  //   title: "Dance Performance",
  //   category: "Live",
  //   src: "/dance.mp4",
  //   duration: "2:15",
  //   featured: false,
  // },
  // {
  //   id: 6,
  //   title: "Behind the Scenes 1",
  //   category: "B-Roll",
  //   src: "/roll1.mp4",
  //   duration: "1:20",
  //   featured: false,
  // },
  // {
  //   id: 7,
  //   title: "Behind the Scenes 2",
  //   category: "B-Roll",
  //   src: "/ROLL2.mp4",
  //   duration: "1:05",
  //   featured: false,
  // },
];

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [filter, setFilter] = useState("All");

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bgVideoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0.77, 0.5, 0, 0]);

  const categories = ["All", "Music Video", "Teaser", "Short Film"];

  const filteredVideos = filter === "All" ? videos : videos.filter((v) => v.category === filter);

  return (
    <div ref={containerRef} className={`min-h-screen bg-black text-slate-50 ${spaceGrotesk.className} selection:bg-rose-600 selection:text-white`}>
      {/* Background B-Roll Video */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: bgVideoOpacity }}
          className="absolute w-full h-full object-cover  grayscale-[0.3]"
        >
          <source src="/feelingsolostbroll.webm" type="video/webm" />
        </motion.video>
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/15 to-black" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6 flex items-center justify-between mix-blend-difference">
        <Link href="/" className="group flex items-center gap-2 text-sm font-medium tracking-widest uppercase hover:text-rose-500 transition-colors">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
        <div className={`${lato.className} text-xl font-bold tracking-tighter uppercase`}>
          BAB-<span className="text-primary">Z</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col justify-end p-8 md:p-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900/20 via-transparent to-transparent z-0"></div>
        
        <div className="relative z-10 max-w-4xl pt-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${archivo.className} text-5xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-6`}
          >
            Visual <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-500 to-rose-800">Archive</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl max-w-lg -mb-7 font-light"
          >
            A curated collection of music videos, live performances, and behind-the-scenes moments captured in raw format.
          </motion.p>
        </div>
      </section>

      {/* Filter Menu */}
      <section className="px-8 md:px-16 py-6 border-y border-white/5 sticky top-0 z-30 bg-black/80 backdrop-blur-md">
        <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm tracking-wider uppercase whitespace-nowrap transition-colors duration-300 ${
                filter === cat ? "text-white font-bold" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {cat}
              {filter === cat && (
                <motion.div 
                  layoutId="activeFilter" 
                  className="h-px bg-rose-600 mt-1" 
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="p-8 md:p-16 min-h-screen">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
        >
          <AnimatePresence>
            {filteredVideos.map((video) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={video.id}
                className={`group relative cursor-pointer overflow-hidden bg-slate-900/50 rounded-lg aspect-video ${video.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
                onClick={() => setActiveVideo(video)}
              >
                <div className="absolute inset-0 bg-slate-900 overflow-hidden">
                  <video 
                    src={video.src}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-60 grayscale-[0.8] group-hover:grayscale-0 group-hover:opacity-100"
                    muted 
                    loop 
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                  {video.thumbnail && (
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={1400}
                      height={900}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700 group-hover:scale-105 opacity-60 grayscale-[0.8] group-hover:opacity-0"
                    />
                  )}
                </div>
                
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-mono text-rose-500 mb-2 block">{video.category}</span>
                    <h3 className={`${archivo.className} text-2xl md:text-4xl font-bold uppercase tracking-tight`}>{video.title}</h3>
                    
                    <div className="flex items-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      <div className="flex items-center gap-1 text-xs text-slate-300">
                        <Clock className="w-3 h-3" /> {video.duration}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-300">
                        <Eye className="w-3 h-3" /> View Project
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-rose-600/20 backdrop-blur-md border border-rose-500/50 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 z-20">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox / Video Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 z-50 text-slate-400 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="w-full max-w-7xl flex flex-col h-full justify-center">
              <motion.div 
                initial={{ y: 40, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.2, duration: 0.8 }}
                className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(225,29,72,0.15)]"
              >
                <video 
                  src={activeVideo.src} 
                  className="w-full h-full"
                  controls 
                  autoPlay
                  playsInline
                />
              </motion.div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-4 px-2"
              >
                <div>
                  <span className="text-rose-500 text-sm tracking-widest uppercase font-mono">{activeVideo.category}</span>
                  <h2 className={`${archivo.className} text-4xl md:text-6xl font-bold uppercase mt-2`}>{activeVideo.title}</h2>
                </div>
                <div className="flex gap-6 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {activeVideo.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" /> Official Selection
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}