import PlayableTrackCard from "@/app/components/PlayableTrackCard";

const tracks = [
  {
    title: "Feeling So Lost",
    image: "/feelingsolostthumbnail.jpg",
    trackId: "0m5DrGT4mIgJJfbZN7lpAX",
    color: "from-purple-600/20 to-blue-600/20",
  },
  {
    title: "Malice",
    image: "/pic1.webp",
    trackId: "0a7dgof68YTmk0kxxwB6mf",
    color: "from-red-600/20 to-purple-600/20",
  },
  {
    title: "Psychedelic Stare",
    image: "/professional3.webp",
    trackId: "4SmvO2gyjg6pt6SWY8XOPr",
    color: "from-purple-600/20 to-pink-600/20",
  },
];

export default function CometCardDemo2() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-12 w-full px-6">
      {tracks.map((track, index) => (
        <PlayableTrackCard key={track.title} {...track} delay={index * 0.2} />
      ))}
    </div>
  );
}
