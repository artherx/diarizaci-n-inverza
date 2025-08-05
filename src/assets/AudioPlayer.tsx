import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { CustomSlider } from "./CustomSlider";
import { useSegmentStore } from "../utils/hooks/UseStoreJson";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const { segments } = useSegmentStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(100);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || isNaN(audio.duration)) return;

    const percentage = (audio.currentTime / audio.duration) * 100;
    setProgress(percentage);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio && !isNaN(audio.duration)) {
      setDuration(audio.duration);
    }
  };

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newProgress = parseFloat(e.target.value);
    if (!audio || isNaN(audio.duration)) return;

    audio.currentTime = (newProgress / 100) * audio.duration;
    setProgress(newProgress);
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-1">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="auto"
      />

      <button onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <p className="text-[.5rem]">{progress.toFixed(2)}%</p>

      <CustomSlider data={segments} tiemTol={duration} progress={progress} />

      <p className="text-[.5rem]">{duration.toFixed(2)}s</p>
    </div>
  );
};

export default AudioPlayer;
