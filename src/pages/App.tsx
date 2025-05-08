import "./App.css";
import { useAudioFile } from "../utils/hooks/UseAudioFile.hook";

function App() {
  const { audioUrl, audioRef, handleFileChange } = useAudioFile();

  return (
    <>
      <h1>Hello World</h1>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
      />

      <audio
        controls
        id="audio-player"
        ref={audioRef}
        src={audioUrl ?? undefined}
      />
    </>
  );
}

export default App;
