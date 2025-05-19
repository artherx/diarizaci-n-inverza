import React, { useRef, useState, useEffect, ChangeEvent } from 'react';

interface AudioPlayerProps {
  audioUrl: string | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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
    <div className="w-full max-w-md mx-auto bg-gray-900 text-white p-6 rounded-2xl shadow-md space-y-4">
      <audio
        ref={audioRef}
        src={audioUrl ?? undefined}
        onTimeUpdate={handleTimeUpdate}
        preload="auto"
      />

      <button
        onClick={togglePlay}
        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full transition text-lg"
      >
        {isPlaying ? '⏸ Pause' : '▶️ Play'}
      </button>

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        className="w-full "
      />
    </div>
  );
};

export default AudioPlayer;
