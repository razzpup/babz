'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Space_Grotesk, Lato } from 'next/font/google';
import CometCardDemo2 from '@/app/components/comet-card-demo2';
import Link from 'next/link';
  

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
// B-roll video sources - using local video from public folder
const brollVideos = [
  "/roll1.webm",
  "/ROLL2.mp4",
  "/feelingsolostbroll.webm"
];

export default function DiscographyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eternalRef = useRef<HTMLDivElement>(null);
  const singlesRef = useRef<HTMLDivElement>(null);
  const artistRef = useRef<HTMLDivElement>(null);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });



  // Background video opacity transforms based on scroll position
  const bgVideo1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [1, 1, 0]);
  const bgVideo2Opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.65, 1], [0, 1, 1, 0]);
  const bgVideo3Opacity = useTransform(scrollYProgress, [0.65, 0.85, 1], [0, 1, 1]);
  const bgImage4Opacity = useTransform(scrollYProgress, [0.65, 0.85, 1], [0, 1, 1]);


  return (
    <div ref={containerRef} className={`min-h-screen bg-background text-white selection:bg-red-900/30 overflow-hidden ${spaceGrotesk.className}`}>
      {/* Background B-Roll Videos */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Desktop B-Roll Videos */}
        <div className="hidden md:flex absolute inset-0">
          <motion.video
          key={0}
            autoPlay
            muted
            loop
            style={{ opacity: bgVideo1Opacity }}
            className="absolute w-full h-full object-cover"
          >
            <source src={brollVideos[1]} type="video/mp4" />
          </motion.video>
          <motion.video
            key={1}
            autoPlay
            muted
            loop
            style={{ opacity: bgVideo2Opacity }}
            className="absolute w-full h-full object-cover"
          >
            <source src={brollVideos[0]} type="video/mp4" />
          </motion.video>
          <motion.video
          key={2}
            autoPlay
            muted
            loop
            style={{ opacity: bgVideo3Opacity }}
            className="absolute w-full h-full object-cover"
          >
            <source src={brollVideos[2]} type="video/mp4" />
          </motion.video>
          

          <div
            className="absolute w-full h-full bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('/gray.jpg')` }}
          />
        </div>

        {/* Mobile Background Colors */}
        <div className="md:hidden fixed inset-0 z-0 pointer-events-none">
          <motion.div style={{ opacity: bgVideo1Opacity }}    className="absolute inset-0 bg-[#3d3d3f]" />
          <motion.div style={{ opacity: bgVideo2Opacity }} className="absolute inset-0 bg-[#353537]" />
          <motion.div style={{ opacity: bgVideo3Opacity }}   className="absolute inset-0 bg-[#2d2d2f]" />
          <motion.div style={{ opacity: bgImage4Opacity }} className="absolute inset-0 bg-[#424244]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link
              href="/"
              className={`text-2xl font-black tracking-tighter cursor-pointer hover:text-primary transition-colors ${lato.className}`}
            >
              BAB<span className="text-primary">-Z</span>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-2 rounded-full border cursor-pointer border-[#a00c30]/50 text-primary hover:bg-[#a00c30]/60 transition-all font-bold text-sm"
            >
              ← BACK TO HOME
            </Link>
          </div>
        </nav>
        
        {/* Eternal Album Section - Left Image, Right Text */}
        <section ref={eternalRef} className="py-16 px-6 flex items-center justify-center min-h-[95vh] relative">
          <div className="w-full max-w-6xl">
            <div className="flex flex-col lg:flex-row mt-10 items-center justify-center gap-12">
              {/* Album Cover */}
              <div className="flex-1 shrink-0 w-full lg:w-auto max-w-xs lg:max-w-none">
                <Image
                  src="/eternal.webp" 
                  alt="ETERNAL Album Cover"
                  width={480}
                  height={480}
                  loading='eager'
                  className="w-full lg:w-auto object-cover rounded-3xl shadow-2xl"
                />
              </div>

              {/* Right Text */}
              <div className="flex flex-col justify-center flex-1">
                <div>
                  <h3 className="text-2xl md:text-5xl font-black tracking-tighter text-[#5accab] mb-6">ETERNAL LIFE</h3>
                  <p className="text-base md:text-xl text-gray-100 leading-relaxed">
                    Experience the depth and complexity of our latest album. Eternal captures the essence of timeless artistry combined with contemporary soundscapes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Releases/Singles Section */}
        <section ref={singlesRef} className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
                  <span className="text-[#a00c30]">RELEASES</span>
                </h2>
              </div>
            </div>

            <div>
              <CometCardDemo2 />
            </div>

            {/* Decorative Background Text */}
            <div className="absolute -bottom-20 -left-20 text-[20rem] font-black text-white/2 select-none pointer-events-none leading-none">
              MUSIC
            </div>
          </div>
        </section>

        {/* Artist Info Section - Right Image, Left Text */}
        <section ref={artistRef} className="px-6 flex items-center justify-center md:min-h-[90vh] relative">
          <div className="w-full max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
              {/* Left Text */}
              <div className="flex flex-col justify-center flex-1">
                <div>
                  <h3 className="text-2xl md:text-5xl font-black tracking-tighter text-[#a00c30] mb-6">THE ARTIST</h3>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                    Put your background and who you are as an artist here. Share your unique story and what makes your music special.
                  </p>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    Talk about your musical journey, inspirations, and what drives you to create music that resonates with your audience.
                  </p>
                </div>
              </div>

              {/* Right Album Cover */}
              <div className="flex-1  shrink-0 w-full lg:w-auto max-w-xs lg:max-w-none">
                <Image
                  src="/professional2.webp"
                  alt="Artist Picture"
                  width={480}
                  height={480}
                  className="w-full lg:w-auto lg:ml-28 object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-white/5 bg-black relative">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-black tracking-tighter">
              BAB<span className="text-[#a00c30]">-Z</span>
            </div>
            <div className="flex gap-7 md:ml-30 text-gray-500">
              <a href="#" className="hover:text-[#a00c30] transition-colors" title="Instagram">
                <Image src="/instagram.svg" alt="Instagram" width="30" height="30" />
              </a>
              <a href="#" className="hover:text-[#a00c30] transition-colors" title="Spotify">
                <Image src="/spotify.svg" alt="Spotify" width="30" height="30" />
              </a>
            </div>
            <p className="text-xs text-gray-600 font-medium">
              © 2026 Bab-Z. All Rights Reserved.
            </p>
          </div>
        </footer>

        {/* Background Glow */}
        <div className="fixed top-1/2 right-0 -translate-y-1/2 w-125 h-125 bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      </div>
    </div>
  );
}
