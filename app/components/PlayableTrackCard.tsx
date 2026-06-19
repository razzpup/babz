import { CometCard } from "@/components/ui/comet-card";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PlayableTrackCardProps {
  title: string;
  image: string;
  trackId: string;
  color?: string;
  sizeClassName?: string;
  delay?: number;
}

export default function PlayableTrackCard({
  title,
  image,
  trackId,
  color,
  sizeClassName = "w-80",
  delay = 0,
}: PlayableTrackCardProps) {
  return (
    <CometCard>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -10 }}
        className={cn("group relative", sizeClassName)}
      >
        {/* Art */}
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-zinc-900">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 opacity-80 group-hover:opacity-100"
          />
          <div
            className={cn(
              "absolute inset-0 bg-linear-to-t opacity-60 transition-opacity group-hover:opacity-80",
              color
            )}
          />
        </div>

        {/* Title + Player */}
        <div className="mt-8">
          <h3 className="text-3xl font-black group-hover:text-[#a00c30] transition-colors">
            {title}
          </h3>
          <div className="mt-4 rounded-xl bg-zinc-900 border border-white/5 overflow-hidden">
            <iframe
              title={`Spotify player: ${title}`}
              src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              style={{ display: "block" }}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </CometCard>
  );
}
