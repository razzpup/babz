'use client';

import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Menu, X, ArrowRight, MapPin, Mail } from 'lucide-react';
import { useState, useRef } from 'react';
import { Archivo, Space_Grotesk, Lato } from 'next/font/google';
import VideoPlayer from './components/VideoPlayer';
import CoolButton from './components/CoolButton';
import SpotifyMiniPlayer from './components/SpotifyMiniPlayer';
import Image from 'next/image';

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSideVideoModal, setShowSideVideoModal] = useState(false);
  // const [bookingStatus, setBookingStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const heroRef = useRef<HTMLElement>(null);
  const skillRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Track overall page scroll progress
  const { scrollYProgress: pageScroll } = useScroll();

  // Opacity transforms for fade in/out effects based on global scroll progress
  // Hero: visible from start (0%) until ~40% scroll, then fades out and stays gone
  const heroOpacity = useTransform(pageScroll, [0, 0.4, 1], [1, 0, 0]);
  // Skill: fades in at ~15%, stays visible until ~55%, then fades out and stays gone
  const skillOpacity = useTransform(pageScroll, [0.15, 0.2, 0.66, 0.75], [0, 1, 1,  0]);
  // Contact: fades in at ~40%, reaches full opacity at ~60%, stays fully visible to the end
  const contactOpacity = useTransform(pageScroll, [0.45, 1], [0, 1]);




  const videos = [
    {
      title: "PSYCHEDELIC STARE",
      views: null,
      thumbnail: "https://images.unsplash.com/photo-1514525253361-bee8718a7439?q=80&w=2073&auto=format&fit=crop",
      duration: "4:20"
    },
    {
      title: "FEELING SO LOST TEASER",
      views: null,
      thumbnail: "/feelingsolostthumbnail.jpg",
      duration: "12:45"
    }
  ];



  // const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setBookingStatus('sending');
  //   setTimeout(() => setBookingStatus('success'), 2000);
  // };

  const navLinks = [
    { name: 'MERCHANDISE', href: '/merchandise' },
    { name: 'DISCOGRAPHY', href: '/discography' },
    { name: 'VIDEOS', href: '/videos' },
    { name: 'CONTACT', href: '#contact' },
    
  ];

  
  return (
    
    <div className={`min-h-screen bg-background text-white selection:bg-red-900/30 ${spaceGrotesk.className}`}>
      <div className="hidden md:block fixed inset-0 z-0 pointer-events-none">
  <motion.div style={{ opacity: heroOpacity }}    className="absolute inset-0 z-30 bg-[url('/bg2.jpg')] bg-contain bg-position-[center_bottom_60%] grayscale-75" />
  <motion.div style={{ opacity: skillOpacity }}   className="absolute inset-0 z-20 bg-[url('/bg4.jpg')] bg-cover bg-center grayscale-75" />
  <motion.div style={{ opacity: contactOpacity }} className="absolute inset-0 z-10 bg-[url('/bg3.jpg')] bg-cover bg-center grayscale-50" />
  {/* Overlay for consistent opacity */}
  <div className="absolute inset-0 bg-black/50 z-5" />
</div>
<div className="md:hidden fixed inset-0 z-0 pointer-events-none">
  <motion.div style={{ opacity: heroOpacity }}    className="absolute inset-0 z-30 bg-[url('/bg2.jpg')] bg-cover bg-position-[center_left_53%] grayscale-75" />
  <motion.div style={{ opacity: skillOpacity }}   className="absolute inset-0 z-20 bg-[url('/bg4.jpg')] bg-cover bg-center grayscale-50" />
  <motion.div style={{ opacity: contactOpacity }} className="absolute inset-0 z-10 bg-[url('/bg3.jpg')] bg-cover bg-center grayscale-50" />
  {/* Overlay for consistent opacity */}
  <div className="absolute inset-0 bg-black/50 z-5" />
</div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className={`text-2xl font-black tracking-tighter ${lato.className}`}>
            BAB<span className="text-primary">-Z</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-[#c71940] transition-colors"
              >
                {link.name}
              </a>
            ))}
           
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-b border-white/5 px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-xl font-bold" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" ref={heroRef}>
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg- rounded-full blur-[120px]" />
          
          <div className="absolute inset-0 bg-linear-to-b from-red-900/8 via-red-900/14 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            
           
            <h1 className={`md:hidden text-7xl md:text-9xl font-black tracking-tighter ${lato.className}`}>
              BAB<span className="text-primary text-glow">-Z</span>
            </h1>
            
            
            <span className="md:hidden inline-block px-4 py-1 rounded-full border border-[#a00c30]/30 bg-[#a00c30]/10 text-[#a00c30] text-xs font-bold tracking-widest">
              NEW ALBUM COMING SOON!
              
            </span>
            

            <div className='relative mx-auto mt-20'>
            <CoolButton />
            </div>
            {/* <motion.button 
              whileHover={{ scale: 1.08 }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#2E2E30] to-[#5c0617] drop-shadow-sm transition-all duration-150 hover:from-[#3d3d3f] hover:to-[#7a081f] relative group"
            >
              
              <motion.div
                className="absolute inset-0 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                style={{
                  background: 'conic-gradient(from 0deg, rgba(199, 25, 64, 0.8), rgba(160, 12, 48, 0.6), rgba(199, 25, 64, 0.2))',
                }}
               
              />
              
              
              <div className="w-2 h-2 bg-[#a00c30] hover:bg-black cursor-pointer rounded-full relative z-10" />
            </motion.button>*/}


          </div>
          
        </div>
       
        {/* Bottom Left BAB-Z */}
        <div className="hidden absolute bottom-14 left-16 z-20 md:block">
          <div className={`text-4xl md:text-6xl py-2 font-black text-center tracking-tighter ${lato.className}`}>
            BAB<span className="text-primary">-Z</span>
          </div>
          <span className="inline-block px-4 py-1 rounded-full border border-[#a00c30]/30 bg-[#a00c30]/10 text-[#c71940] text-xs font-bold tracking-widest mb-6">
              NEW ALBUM COMING SOON!
            </span>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section id="videos" ref={skillRef} className="py-24  relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className={`text-5xl md:text-8xl font-black tracking-tighter leading-none ${lato.className}`}>

              <span className="text-primary tracking-tight">FEATURED</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Video with VideoPlayer */}
            <div className="lg:col-span-8 group relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/5">
              <VideoPlayer src="/leona 4.webm" title="FLY AS ME (BRUNO MARS) COVER" thumbnail="/thumbnail.jpg" />
            </div>

            {/* Side Video */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {videos.slice(1, 2).map((video) => (
                <div
                  key={video.title}
                  className="group cursor-pointer"
                  onClick={() => setShowSideVideoModal(true)}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 mb-4">
                    <Image
                    width={1400}
                      height={800}
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <Play className="fill-white ml-0.5" size={18} />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-[10px] font-bold rounded">
                      {video.duration}
                    </div>
                  </div>
                  <h4 className={`font-black text-lg group-hover:text-[#c71940] transition-colors ${lato.className}`}>{video.title}</h4>
                  <p className="text-white/40 text-sm font-bold mt-1">{video.views}</p>
                </div>
              ))}

              <SpotifyMiniPlayer trackId="0m5DrGT4mIgJJfbZN7lpAX" />

              <a
                href="/videos"
                className="mt-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#a00c30] hover:bg-[#c71940] text-white font-bold rounded-full group cursor-pointer transition-all shadow-lg hover:shadow-xl"
              >
                VIEW ALL VIDEOS 
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-all">
                  <ArrowRight size={16} className="text-[#a00c30]" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Background Glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-125 h-125 bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      </section>

       

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-linear-to-b from-transparent to-black/80 relative overflow-hidden" ref={contactRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-black tracking-tight mb-6 ${lato.className}`}>
              GET IN <span className={`text-primary`}>TOUCH</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Have questions or business inquiries? Reach out to us through any of these channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a00c30]/50 transition-all text-center">
              <div className="w-12 h-12 bg-[#a00c30]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-[#a00c30]" />
              </div>
              <h3 className="font-black text-lg mb-2">EMAIL</h3>
              <a href="mailto:contact@babz.com" className="text-gray-400 hover:text-[#a00c30] transition-colors font-bold">
                contact@babz.com
              </a>
            </div>

            {/* Phone */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a00c30]/50 transition-all text-center">
              <div className="w-12 h-12 bg-[#a00c30]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music size={24} className="text-[#a00c30]" />
              </div>
              <h3 className="font-black text-lg mb-2">SOCIAL MEDIA</h3>
              <div className="flex justify-center gap-4">
                <a href="#" className="text-gray-400 hover:text-[#a00c30] transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-[#a00c30] transition-colors">
                  Twitter
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a00c30]/50 transition-all text-center">
              <div className="w-12 h-12 bg-[#a00c30]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-[#a00c30]" />
              </div>
              <h3 className={`font-black text-lg mb-2 ${archivo.className}`}>ADDRESS</h3>
              <p className="text-gray-400 text-sm font-bold">
                123 Music Lane<br />
                Los Angeles, CA 90001
              </p>
            </div>
          </div>

          {/* Contact Form */}
          
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className={`text-2xl font-black tracking-tighter ${archivo.className}`}>
            BAB<span className="text-[#a00c30]">-Z</span>
          </div>
          <div className="flex gap-7 md:ml-10 text-gray-500">
            <a href="https://www.instagram.com/bab.z_/" className="hover:text-[#a00c30] transition-colors" title="Instagram">
              <Image src="/instagram.svg" alt="Instagram" width="30" height="30" />
            </a>
            <a href="https://open.spotify.com/artist/30JLWmu4Tx2wAXW9Ob05It?si=TbwxEahsSzW-MRsnRj3h8A" className="hover:text-[#a00c30] transition-colors" title="Spotify">
              <Image src="/spotify.svg" alt="Spotify" width="30" height="30" />
            </a>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center cursor-pointer gap-2 text-xs text-gray-600 hover:text-[#a00c30] font-medium transition-colors"
          >
            BACK TO TOP <ArrowRight size={26} className="-rotate-90" />
          </button>
        </div>
      </footer>

      {/* Side Video Modal */}
      <AnimatePresence>
        {showSideVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12"
          >
            <button
              onClick={() => setShowSideVideoModal(false)}
              className="absolute top-6 right-6 z-50 text-white hover:text-primary transition-colors p-3 rounded-full bg-white/10 hover:bg-white/20"
            >
              <X size={24} />
            </button>
            <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 relative shadow-2xl">
              <VideoPlayer src="/videos/Feeling So Lost Teaser.webm" title="FEELING SO LOST TEASER" thumbnail="/feelingsolostthumbnail.jpg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
