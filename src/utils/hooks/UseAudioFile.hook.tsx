import { useRef, useState, ChangeEvent } from "react";

export const useAudioFile = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFile(file);               // <-- guarda el archivo real
      setAudioUrl(url);            // <-- guarda la URL local para reproducir
      if (audioRef.current) {
        audioRef.current.load();
      }
    }
  };

  const clearFile = () => {
    setFile(null);
    setAudioUrl(null);
    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  return {
    file,         // <-- úsalo para AssemblyAI
    audioUrl,     // <-- úsalo en el <audio />
    audioRef,
    handleFileChange,
    clearFile,
  };
};
