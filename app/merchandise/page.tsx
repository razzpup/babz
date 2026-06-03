'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';
import Image from 'next/image';


const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function MerchandisePage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  // const [email, setEmail] = useState('');

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const navLinks = [
    { name: 'MERCHANDISE', href: '/merchandise' },
    { name: 'DISCOGRAPHY', href: '/discography' },
    { name: 'VIDEOS', href: '/videos' },
    { name: 'CONTACT', href: '/#contact' },
  ];

  // const handleNewsletterSignup = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setEmailStatus('sending');
  //   setTimeout(() => {
  //     setEmailStatus('success');
  //     setEmail('');
  //     setTimeout(() => setEmailStatus('idle'), 3000);
  //   }, 1500);
  // };

  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className={`min-h-screen bg-background text-white selection:bg-red-900/30 ${spaceGrotesk.className}`}>
      {/* Animated Background */}
      <div className="hidden md:block fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 bg-gray-900/30 opacity-20" 
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-background" />
      </div>

      {/* Mobile Background */}
      <div className="md:hidden fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 bg-[url('/bg1.jpg')] bg-cover bg-position-[center_left_40%] opacity-20 grayscale" 
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-background" />
      </div>

      {/* Navigation */}
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium hover:text-[#c71940] transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-black border-b border-white/5 px-6 py-8 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xl font-bold hover:text-[#a00c30] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        ref={heroRef}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-250 bg-[#a00c30]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-200 h-200 bg-purple-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block "
          >
            <div className="px-4 mt-5 py-2 rounded-full bg-[#a00c30]/20 border border-[#a00c30]/50 text-[#a00c30] text-xs font-black tracking-widest">
              SOMETHING BIG IS COMING
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight mb-6"
          >
            MERCH <span className="text-[#a00c30]">COMING</span> <br /> SOON
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Limited edition merchandise is on the way. Exclusive apparel, accessories, and collectibles designed for the community.
          </motion.p>

          {/* Countdown Cards */}
          

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-gray-500 text-sm font-bold mb-6">WHAT TO EXPECT</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              {['T-Shirts', 'Hoodies', 'Hats', 'Limited Editions'].map((item) => (
                <span key={item} className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute top-20 right-10 text-[#a00c30]/20 text-6xl font-black"
        >
          ★
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute bottom-20 left-10 text-[#a00c30]/10 text-6xl font-black"
        >
          ◆
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
              <Image src="/instagram.svg" alt="Instagram" width="30" height="30" />
            </a>
            <a href="#" className="hover:text-[#a00c30] transition-colors" title="Spotify">
              <Image src="/spotify.svg" alt="Spotify" width="30" height="30" />
            </a>
            <a href="#" className="hover:text-[#a00c30] transition-colors" title="Apple Music">
              <Image src="/applemusic.svg" alt="Apple Music" width="30" height="30" />
            </a>
          </div>
          
      </div>
      </footer>
    </div>
  );
}
