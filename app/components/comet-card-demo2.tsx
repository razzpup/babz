import { CometCard } from "@/components/ui/comet-card";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Play, Disc, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const albums = [
    {
      title: "Vortex",
      year: "2024",
      image: "/professional1.webp",
      tracks: "12 Tracks",
      color: "from-purple-600/20 to-blue-600/20"
    },
    {
      title: "Malice",
      year: "2023",
      image: "/pic1.webp",
      tracks: "10 Tracks",
      color: "from-red-600/20 to-purple-600/20"
    },
    {
      title: "Janus",
      year: "2022",
      image: "/professional3.webp",
      tracks: "14 Tracks",
      color: "from-purple-600/20 to-pink-600/20"
    }
  ];



export default function CometCardDemo2() {
  const router = useRouter(); 
  return (
    <div className="flex flex-wrap justify-center items-center gap-12 w-full px-6">
      {albums.map((album, index) => (
        <CometCard key={album.title}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            className="group relative w-80"
          >
            {/* Album Card */}
            <div className="relative w-80 h-80 overflow-hidden rounded-2xl bg-zinc-900">
              <img 
              src={album.image} 
                alt={album.title}
                className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 opacity-80 group-hover:opacity-100"
              />
              
              {/* Overlay */}
              <div className={cn(
                "absolute inset-0 bg-linear-to-t opacity-60 transition-opacity group-hover:opacity-80",
                album.color
              )} />

              {/* Hover Content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-[#a00c30] rounded-full flex items-center justify-center shadow-2xl shadow-[#a00c30]/50"
                >
                  <Play className="fill-white ml-1" size={24} />
                </motion.button>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black tracking-widest">
                {album.year}
              </div>
            </div>

            {/* Album Info */}
            <div className="mt-8 flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-black group-hover:text-[#a00c30] transition-colors">
                  {album.title}
                </h3>
                <p className="text-gray-500 text-base font-medium flex items-center gap-2 mt-2">
                  <Disc size={16} className="text-[#a00c30]" />
                  {album.tracks}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-3 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
                  <Music size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </CometCard>
      ))}
    </div>
  );
}
