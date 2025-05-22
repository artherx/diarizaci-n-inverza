import "./App.css";
import { useAudioFile } from "../utils/hooks/UseAudioFile.hook";
import { useAssemblyIA } from "../utils/hooks/assemblyIA.hook";
import { useState } from "react";
import { adapterIA } from "../utils/hooks/adapterAI.hook";
import AudioPlayer from "../assets/AudioPlayer";
import { AudioSegment } from "../utils/interface";
import { MilisegundostoSecongs } from "../utils/hooks/logica.hook";
const matris: AudioSegment[] = [];
function App() {
  const { file, audioUrl, handleFileChange } = useAudioFile();
  const run = useAssemblyIA();
  const [language, setLanguage] = useState<string>("en");
  const [lerning, setLerning] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center justify-between gap-10 ">
      <h1>Hello World</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <AudioPlayer audioUrl={audioUrl} matris={matris} />
      <select name="" id="" onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
      <button
        onClick={async () => {
          try {
            setLerning(false);
            console.log("Ejecutando la IA");
            const objeto = await run(file, language);
            const newMappings = adapterIA({
              proprun: { file, language_code: language },
              vacion: 250,
              objeto,
            });
            console.log("Resultados de la transcripción:", newMappings.length);
            newMappings.map((item, index) => {
              matris.push(item);
              matris[index].timeRange.start = MilisegundostoSecongs(
                item.timeRange.start
              );
              matris[index].timeRange.end = MilisegundostoSecongs(
                item.timeRange.end
              );
            });

            setLerning(true);
          } catch (error) {
            alert(error);
          }
        }}
      >
        {lerning ? "Entrenar" : "entrenando"}
      </button>
      <div style={{width: "300px", height: "200px", overflow: "auto", border: "1px"}}>
        {matris.length > 0 ? (
          matris.map((item) => {
            return <p className="hover:transition hover:text-amber-300">{item.transcript.text}</p>;
          })
        ) : (
          <p>""</p>
        )}
      </div>
    </div>
  );
}

export default App;
