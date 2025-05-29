import "./App.css";
import { useAudioFile } from "../utils/hooks/UseAudioFile.hook";
import { useAssemblyIA } from "../utils/hooks/assemblyIA.hook";
import { useState } from "react";
import { adapterIA } from "../utils/hooks/adapterAI.hook";
import AudioPlayer from "../assets/AudioPlayer";
import { AudioSegment } from "../utils/interface";
import { MilisegundostoSecongs } from "../utils/hooks/logica.hook";
import { Modal } from "../assets/Modal";
const algo: AudioSegment = {
  id: 0,
  type: "silence",
  timeRange: {
    start: 0,
    end: 1,
  },
  speaker: {
    name: "void",
  },
  transcript: {
    text: "[...]",
    model: "auto",
  },
};
const algo1: AudioSegment = {
  id: 0,
  type: "speaker",
  timeRange: {
    start: 1,
    end: 5,
  },
  speaker: {
    name: "A",
  },
  transcript: {
    text: "Estoy asustando",
    model: "auto",
  },
};
const matris: AudioSegment[] = [algo, algo1];
function App() {
  const { file, audioUrl, handleFileChange } = useAudioFile();
  const run = useAssemblyIA();
  const [language, setLanguage] = useState<string>("en");
  const [lerning, setLerning] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [segments, setSegments] = useState<AudioSegment[]>([algo, algo1]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const updateSegmentText = (text: string) => {
    if (selectedIndex === null) return;
    const updated = [...segments];
    updated[selectedIndex].transcript.text = text;
    setSegments(updated);
  };

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
    setModal(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedIndex === null) return;
    const updated = [...segments];
    updated[selectedIndex].transcript.text = e.target.value;
    setSegments(updated);
  };

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
      <div
        style={{
          width: "300px",
          height: "200px",
          overflow: "auto",
          border: "1px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {segments.length > 0 ? (
          segments.map((item, index) => {
            return item.type === "silence" ? (
              <div
                className="w-fit"
                onClick={() => {
                  handleOpenModal(index);
                }}
                key={index}
              >
                <p className="hover:transition hover:text-amber-300">
                  {item.transcript.text}
                </p>
              </div>
            ) : (
              <p key={index}>{item.transcript.text}</p>
            );
          })
        ) : (
          <p>{}</p>
        )}
        <Modal isOpen={modal} onClose={() => setModal(false)}>
          {selectedIndex !== null && (
            <div className="flex flex-col gap-4">
              <h1 className="text-white text-xl">Editar Segmento</h1>
              <input
                className="p-2 rounded"
                type="text"
                value={segments[selectedIndex].transcript.text}
                onChange={handleTextChange}
              />
              <button
                onClick={() => {
                  updateSegmentText(segments[selectedIndex].transcript.text);
                  setModal(false)
                }}
                className="bg-green-500 px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default App;
