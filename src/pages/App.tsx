import "./App.css";
import { useAudioFile } from "../utils/hooks/UseAudioFile.hook";
import { useAssemblyIA } from "../utils/hooks/assemblyIA.hook";
import { useState } from "react";
import { adapterIA } from "../utils/hooks/adapterAI.hook";
import AudioPlayer from "../assets/AudioPlayer";
import { CustomSlider } from "../assets/CustomSlider";
import { AudioSegment, VoidProp } from "../utils/interface";
import { FaPlay } from "react-icons/fa6";
const algo: AudioSegment = {
  ...VoidProp,
  id: 1,
  timeRange: {
    start: 10,
    end: 20,
  },
  speaker: {
    name: "Juan",
  },
  type: "speaker",
};
const algo1: AudioSegment = { ...VoidProp };

const matris: AudioSegment[] = [algo, algo1];
function App() {
  const { file, audioUrl, handleFileChange } = useAudioFile();
  const run = useAssemblyIA();
  const [language, setLanguage] = useState<string>("en");

  return (
    <div className="flex flex-col items-center justify-between gap-10 ">
      <h1>Hello World</h1>
      <div className="flex items-center gap-1">
        <button>
          <FaPlay onClick={() => console.log("click")} />
        </button>
        <p className="text-[.5rem]">00:00</p>

        <CustomSlider data={matris} tiemTol={200} />

        <p className="text-[.5rem]">00:00</p>
      </div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />

      <AudioPlayer audioUrl={audioUrl} />
      <select name="" id="" onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
      <button
        onClick={async () => {
          const objeto = await run(file, language);
          const newMappings = adapterIA({
            proprun: { file, language_code: language },
            vacion: 250,
            objeto,
          });
          console.log("Resultados de la transcripción:", newMappings);
        }}
      >
        Entrenar
      </button>
    </div>
  );
}

export default App;
