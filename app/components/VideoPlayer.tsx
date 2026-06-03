'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  src: string;
  title: string;
  thumbnail?: string;
}

export default function VideoPlayer({ src, title, thumbnail }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to get duration immediately if it's already loaded
    if (video.duration && isFinite(video.duration)) {
      setDuration(video.duration);
    }

    const updateTime = () => {
      setCurrentTime(video.currentTime);
    };
    
    const updateDuration = () => {
      if (video.duration && isFinite(video.duration)) {
        setDuration(video.duration);
      }
    };
    
    const handleEnded = () => setIsPlaying(false);
    const handleLoadedMetadata = () => {
      if (video.duration && isFinite(video.duration)) {
        setDuration(video.duration);
      }
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('durationchange', updateDuration);
    video.addEventListener('ended', handleEnded);
    
    // Force load metadata
    video.load();

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('durationchange', updateDuration);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const volumePercent = isMuted ? 0 : volume * 100;

  return (
    <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/5 shadow-2xl shadow-purple-500/10 group">
      <video
        ref={videoRef}
        src={src}
        preload="metadata"
        poster={thumbnail}
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => {
          const vid = e.currentTarget;
          if (vid.duration && isFinite(vid.duration)) {
            setDuration(vid.duration);
          }
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

      {/* Video Info */}
      <div className="absolute bottom-4 md:bottom-6 left-8 right-8">
        <span className="text-[#a00c30] font-black tracking-widest text-xs block">NOW PLAYING</span>
        <h3 className="text-md md:text-2xl font-black">{title}</h3>
      </div>

      {/* Controls Container */}
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className={styles.progressContainer}>
            <input
              type="range"
              min="0"
              max={Math.max(duration, 0) || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className={styles.progressSlider}
              style={{
                background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.2) ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
          </div>
        </div>

        {/* Control Buttons Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Play and time */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayPause}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
            </button>
            <span className="text-xs font-bold text-white/80 whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right side - Volume and fullscreen */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* Volume Slider */}
            <div className={styles.volumeContainer}>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
                style={{
                  background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${volumePercent}%, rgba(255,255,255,0.2) ${volumePercent}%, rgba(255,255,255,0.2) 100%)`
                }}
                title="Volume"
              />
            </div>

            <button
              onClick={handleFullscreen}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              title="Fullscreen"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Center play button (shown when video is paused) */}
      {!isPlaying && (
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-20 h-20 bg-[#e76509] group-hover:bg-[#fa8532] hover:bg-[#fa8532] rounded-full flex items-center justify-center transition-colors shadow-2xl shadow-[#ff6a00]/50">
            <Play size={32} className="fill-white ml-1 text-white" />
          </div>
        </button>
      )}
    </div>
  );
}
