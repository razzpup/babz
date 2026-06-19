interface SpotifyMiniPlayerProps {
  trackId: string;
  label?: string;
}

export default function SpotifyMiniPlayer({ trackId, label = "LISTEN NOW" }: SpotifyMiniPlayerProps) {
  return (
    <div>
      <p className="text-xs font-bold tracking-widest text-[#ff4c61] mb-3">{label}</p>
      <div className="rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden">
        <iframe
          title={`Spotify player: ${label}`}
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
  );
}
