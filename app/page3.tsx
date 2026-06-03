'use client';

/* Find better font and gradient colours for artist title and font for rest of text.
Isolate albums and singles to the discography section
Show teaser and another video on homepage and then have a separate videos page with more content.
Find a way to implement clips of teaser video as a background show 
Find a more clean slated minimalstic button instead of the GlassButton with a smooth animation on hover and click, still round but
*/
import { useScroll, useTransform, motion } from 'framer-motion';
import { Music, Play, Share2, MessageCircle, Link as LinkIcon, Menu, X, ExternalLink, ArrowRight, MapPin, Mail } from 'lucide-react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import VideoPlayer from './components/VideoPlayer';
import CoolButton from './components/CoolButton';

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const heroRef = useRef<HTMLElement>(null);
  const skillRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Scroll progress per section
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress: skillScroll } = useScroll({ target: skillRef, offset: ["start end", "end start"] });
  const { scrollYProgress: contactScroll } = useScroll({ target: contactRef, offset: ["start end", "end start"] });

  // Opacity transforms for fade in/out effects
  const heroOpacity = useTransform(heroScroll, [0, 0.5, 1], [1, 1, 0]);
  const skillOpacity = useTransform(skillScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const contactOpacity = useTransform(contactScroll, [0, 0.2, 1], [0, 1, 1]);




  const videos = [
    {
      title: "PSYCHEDELIC STARE",
      views: "",
      thumbnail: "https://images.unsplash.com/photo-1514525253361-bee8718a7439?q=80&w=2073&auto=format&fit=crop",
      duration: "4:20"
    },
    {
      title: "LIVE AT THE GARDEN",
      views: "",
      thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
      duration: "12:45"
    }
  ];



  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingStatus('sending');
    setTimeout(() => setBookingStatus('success'), 2000);
  };

  const navLinks = [
    { name: 'Merchandise', href: '/merchandise' },
    { name: 'Discography', href: '/discography' },
    { name: 'Videos', href: '/videos' },
    { name: 'Contact', href: '#contact' },
    
  ];

  
  return (
    
    <div className="min-h-screen bg-[#2E2E30] text-white selection:bg-red-900/30">
      <div className="hidden md:block fixed inset-0 z-0 pointer-events-none">
  <motion.div style={{ opacity: heroOpacity }}    className="absolute inset-0 bg-[url('/bg2.webp')] bg-cover bg-position-[center_bottom_60%] opacity-20" />
  <motion.div style={{ opacity: skillOpacity }}   className="absolute inset-0 bg-[url('/bg4.jpg')] bg-cover bg-center opacity-20 grayscale-25" />
  <motion.div style={{ opacity: contactOpacity }} className="absolute inset-0 bg-[url('/bg3.jpg')] bg-cover bg-center opacity-20 grayscale-50" />
</div>
<div className="md:hidden fixed inset-0 z-0 pointer-events-none">
  <motion.div style={{ opacity: heroOpacity }}    className="absolute inset-0 bg-[url('/bg2.webp')] bg-cover bg-position-[center_left_53%] opacity-20 " />
  <motion.div style={{ opacity: skillOpacity }}   className="absolute inset-0 bg-[url('/bg4.jpg')] bg-cover bg-center opacity-20 grayscale-25" />
  <motion.div style={{ opacity: contactOpacity }} className="absolute inset-0 bg-[url('/bg3.jpg')] bg-cover bg-center opacity-20 grayscale-50" />
</div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter">
            BAB<span className="text-[#a00c30]">-Z</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
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
            
           
            <h1 className="md:hidden text-7xl md:text-9xl font-black tracking-tighter">
              BAB<span className="text-[#a00c30] text-glow">-Z</span>
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
              
              
              <div className="w-2 h-2 bg-[#a00c30] hover:bg-black cursor-pointer rounded-full relative z-10\" />
            </motion.button>*/}


          </div>
          
        </div>
       
        {/* Social Sidebar */}
        <div className="absolute left-6 bottom-10 hidden lg:flex flex-col gap-6 z-20">
          {[Share2, MessageCircle, LinkIcon].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-gray-500 hover:text-[#c71940] transition-colors\"
            >
              <Icon size={20} />
            </a>
          ))}
          <div className="w-px h-20 bg-linear-to-b from-[#c71940] to-transparent mx-auto mt-2" />
        </div>

        {/* Bottom Left BAB-Z */}
        <div className="hidden absolute bottom-14 left-16 z-20 md:block">
          <div className="text-4xl md:text-6xl py-2 font-black text-center tracking-tighter">
            BAB<span className="text-[#a00c30]">-Z</span>
          </div>
          <span className="inline-block px-4 py-1 rounded-full border border-[#a00c30]/30 bg-[#a00c30]/10 text-[#c71940] text-xs font-bold tracking-widest mb-6">
              NEW ALBUM COMING SOON!
            </span>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-[#a00c30] rounded-full" />
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section id="videos" ref={skillRef} className="py-24  relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">

              <span className="text-[#a00c30]">FEATURED</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Video with VideoPlayer */}
            <div className="lg:col-span-8 group relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/5">
              <VideoPlayer src="/leona 4.webm" title="PSYCHEDELIC STARE" thumbnail="/thumbnail.jpg" />
            </div>

            {/* Side Video */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {videos.slice(1, 2).map((video, i) => (
                <div
                  key={video.title}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 mb-4">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-[#a00c30] rounded-full flex items-center justify-center">
                        <Play className="fill-white ml-0.5" size={18} />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-[10px] font-bold rounded">
                      {video.duration}
                    </div>
                  </div>
                  <h4 className="font-black text-lg group-hover:text-[#c71940] transition-colors">{video.title}</h4>
                  <p className="text-white/40 text-sm font-bold mt-1">{video.views}</p>
                </div>
              ))}
              
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
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              GET IN <span className="text-[#a00c30]">TOUCH</span>
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
              <a href="mailto:contact@babz.com" className="text-gray-400 hover:text-[#a00c30] transition-colors font-bold">>
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
              <h3 className="font-black text-lg mb-2">ADDRESS</h3>
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
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center cursor-pointer gap-2 text-xs text-gray-600 hover:text-[#a00c30] font-medium transition-colors"
          >
            BACK TO TOP <ArrowRight size={26} className="-rotate-90" />
          </button>
        </div>
      </footer>
    </div>
  );
}
