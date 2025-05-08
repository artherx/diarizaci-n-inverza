import "./App.css";
import { useAudioFile } from "../utils/hooks/UseAudioFile.hook";
import { useAssemblyIA } from "../utils/hooks/assemblyIA.hook";
import { useState } from "react";

function App() {
  const { file, audioUrl, audioRef, handleFileChange } = useAudioFile();
  const run = useAssemblyIA(file);
  const [language, setLanguage] = useState<string>("en");

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
      <select name="" id="" onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
      <button onClick={()=>run(language)}>Entrenar</button>
    </>
  );
}

export default App;
