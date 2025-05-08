import "./App.css";
import { useAudioFile } from "../utils/hooks/UseAudioFile.hook";
import { AssemblyAI, SpeechModel } from "assemblyai";

function App() {
  const { file, audioUrl, audioRef, handleFileChange } = useAudioFile();
  const audioIA = import.meta.env.VITE_API_ASSEMBLYIA;

  const client = new AssemblyAI({
    apiKey: audioIA,
  });

  const run = async () => {
    if (!file) {
      console.log("No hay audio");
      return;
    }
    const archive = await client.files.upload(file);
    const params = {
      audio: archive,
      speech_model: "universal" as SpeechModel,
    };
  
    try {
      const transcript = await client.transcripts.transcribe(params);
      console.log("llego: "+transcript.text);
    } catch (error) {
      console.error("Error transcribiendo:", error);
    }
  };

  return (
    <>
      <h1>Hello World</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} />

      <audio
        controls
        id="audio-player"
        ref={audioRef}
        src={audioUrl ?? undefined}
      />
      <button onClick={run}>Entrenar</button>
    </>
  );
}

export default App;
