import "./App.css";
import { useAudioFile } from "../utils/hooks/UseAudioFile.hook";
import { useAssemblyIA } from "../utils/hooks/assemblyIA.hook";
import { useState } from "react";
import { adapterIA } from "../utils/hooks/adapterAI.hook";

function App() {
  const { file, audioUrl, audioRef, handleFileChange } = useAudioFile();
  const run = useAssemblyIA();
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
      <button
        onClick={async () => {
          
          const objeto = await run(file, language);
          const newMappings = adapterIA({ proprun: { file, language_code: language }, vacion: 250, objeto });
          console.log("Resultados de la transcripción:", newMappings);
        }}
      >
        Entrenar
      </button>
    </>
  );
}

export default App;
