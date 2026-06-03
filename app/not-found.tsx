'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Home } from 'lucide-react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-[#2E2E30] text-white selection:bg-red-900/30">
      {/* Animated Background */}
      <div className="hidden md:block fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 bg-[url('/bg3.jpg')] bg-cover bg-center opacity-20 grayscale-50" 
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-[#2E2E30]" />
      </div>

      {/* Mobile Background */}
      <div className="md:hidden fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 bg-[url('/bg4.jpg')] bg-cover bg-center opacity-20 grayscale" 
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-[#2E2E30]" />
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.button
            onClick={() => router.push('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter cursor-pointer hover:text-[#a00c30] transition-colors"
          >
            BAB<span className="text-[#a00c30]">-Z</span>
          </motion.button>

          <motion.button
            onClick={() => router.push('/')}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 px-6 py-2 rounded-full border cursor-pointer border-[#a00c30]/50 text-[#a00c30] hover:bg-[#a00c30]/40 transition-all font-bold text-sm"
          >
            <Home size={16} />
            HOME
          </motion.button>
        </div>
      </nav>

      {/* Main Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        ref={heroRef}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-300 bg-red-600/10 rounded-full blur-[150px]" />
          <div className="absolute top-1/4 right-0 w-200 h-200 bg-red-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* 404 Number with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <div className="text-9xl md:text-[180px] lg:text-[200px] font-black tracking-tighter leading-none">
              <span className="text-[#a00c30]">4</span>
              <motion.span
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white inline-block"
              >
                0
              </motion.span>
              <span className="text-red-900">4</span>
            </div>
          </motion.div>

          {/* Main Message */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6"
          >
            PAGE NOT <span className="text-[#a00c30]">FOUND</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            Looks like this page got lost in the beat. The track you're looking for doesn't exist here.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500 font-bold mb-12"
          >
            Error Code: 404
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-[#a00c30] hover:bg-[#c71940] text-white font-black rounded-xl transition-all flex items-center justify-center gap-2"
            >
              BACK HOME
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="px-8 py-4 bg-white/5 border border-white/10 hover:border-[#a00c30]/50 text-white font-black rounded-xl transition-all"
            >
              GO BACK
            </motion.button>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-left max-w-md mx-auto"
          >
            <p className="text-gray-500 text-xs font-bold tracking-widest mb-4">YOU MIGHT LIKE</p>
            <div className="space-y-3">
              {[
                { label: 'Discography', href: '/discography' },
                { label: 'Music', href: '/#music' },
                { label: 'Contact', href: '/#contact' }
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ x: 10 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 mb-5 rounded-lg bg-white/5 border border-white/10 hover:border-[#a00c30]/50 hover:bg-white/10 transition-all group"
                >
                    <div className="w-8 h-8 rounded-full border border-[#a00c30]/50 flex items-center justify-center text-[#a00c30] text-xs font-black group-hover:bg-[#a00c30]/20 transition-all">
                    →
                  </div>
                  <span className="font-bold text-sm">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated Decorative Elements */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute top-1/4 left-8 text-[#a00c30]/20 text-7xl font-black"
        >
          ★
        </motion.div>

        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute bottom-1/4 right-8 text-purple-600/20 text-7xl font-black"
        >
          ◆
        </motion.div>

        {/* Floating Glitch Effect */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            x: [-2, 2, -2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-[#a00c30]/10">
            404
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black tracking-tighter">
            BAB<span className="text-[#a00c30]">-Z</span>
          </div>
          <div className="flex gap-7 md:ml-30 text-gray-500">
            <a href="#" className="hover:text-[#a00c30] transition-colors" title="Instagram">
              <img src="/instagram.svg" alt="Instagram" width="30" height="30" />
            </a>
            <a href="#" className="hover:text-[#a00c30] transition-colors" title="Spotify">
              <img src="/spotify.svg" alt="Spotify" width="30" height="30" />
            </a>
            <a href="#" className="hover:text-[#a00c30] transition-colors" title="Apple Music">
              <img src="/applemusic.svg" alt="Apple Music" width="30" height="30" />
            </a>
          </div>
          <div className="text-xs text-gray-600 font-medium">
            © 2026 BAB-Z. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
