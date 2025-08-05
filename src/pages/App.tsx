import "./App.css";
import { useAssemblyIA } from "../utils/hooks/assemblyIA.hook";
import { adapterIA } from "../utils/hooks/adapterAI.hook";
import AudioPlayer from "../assets/AudioPlayer";
import BarraSuperior from "../components/BarraSuperior";
import DropArea from "../components/DropArea";
import SegmentList from "../components/SegmentList";
import { useAudioStore } from "../utils/hooks/useAudioStore";
import { useUIStore } from "../utils/hooks/useUIStore";

function App() {
  const run = useAssemblyIA();
  // Usar los stores especializados
  const {
    file,
    audioUrl,
    hasFile,
  } = useAudioStore();
  
  const {
    language,
    isTraining,
    setLanguage,
    setIsTraining,
    setSelectedIndex,
  } = useUIStore();

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col items-center justify-start gap-4 p-0">
      <BarraSuperior />
      <p className="text-gray-300 mb-2">Sube o arrastra un archivo de audio y obtén la transcripción segmentada por hablante y silencios.</p>
      <DropArea />
      {hasFile && <AudioPlayer audioUrl={audioUrl} />}
      <div className="flex gap-4 items-center mb-2">
        <label htmlFor="language" className="text-gray-200">Idioma:</label>
        <select id="language" className="bg-gray-800 text-amber-200 px-3 py-1 rounded" onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      <button
        className={`px-6 py-2 rounded-lg font-semibold shadow transition text-white ${isTraining ? 'bg-amber-400 hover:bg-amber-500' : 'bg-gray-500 cursor-not-allowed animate-pulse'}`}
        disabled={!isTraining}
        onClick={async () => {
          if (!hasFile) {
            alert("Por favor selecciona un archivo de audio primero.");
            return;
          }
          
          try {
            setIsTraining(false);
            console.log("Ejecutando la IA");
            const objeto = await run(file, language);
            const newMappings = adapterIA({
              proprun: { file, language_code: language },
              vacion: 250,
              objeto,
            });
            console.log("Resultados de la transcripción:", newMappings.length);
            
            // Los segmentos ya están procesados y en el store
            setIsTraining(true);
            
            // Establecer el último segmento como seleccionado
            const tam = newMappings.length > 0 ? newMappings.length - 1 : 0;
            setSelectedIndex(tam);
          } catch (error) {
            alert(error);
            setIsTraining(true);
          }
        }}
      >
        {isTraining ? "Entrenar" : (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Entrenando...
          </span>
        )}
      </button>
      <SegmentList />
    </div>
  );
}

export default App;
