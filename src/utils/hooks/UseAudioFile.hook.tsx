import { useRef, useState, ChangeEvent } from "react";

export const useAudioFile = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      if (audioRef.current) {
        audioRef.current.load(); // Recargar el audio
      }
    }
  };

  return {
    audioUrl,
    audioRef,
    handleFileChange,
  };
};
