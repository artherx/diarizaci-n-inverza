import "./App.css";
import AudioPlayer from "../assets/AudioPlayer";
import BarraSuperior from "../components/BarraSuperior";
import DropArea from "../components/DropArea";
import SegmentList from "../components/SegmentList";
import { useAudioStore } from "../utils/hooks/useAudioStore";
import { useUIStore } from "../utils/hooks/useUIStore";
import { useFastAPI, adaptFastAPIResponse } from "../utils/hooks";

function App() {
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
  
  const {
    isLoading: fastAPILoading,
    error: fastAPIError,
    response: fastAPIResponse,
    uploadAudio,
  } = useFastAPI();

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col items-center justify-start gap-4 p-0">
      <BarraSuperior />
      <p className="text-gray-300 mb-2">Sube o arrastra un archivo de audio y obtén la transcripción segmentada por hablante y silencios.</p>
      {fastAPIError && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Error: {fastAPIError}
        </div>
      )}
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
            console.log("🎯 Iniciando proceso en App.tsx");
            console.log("📤 Enviando archivo al servidor FastAPI");
            
            // Obtener la respuesta directamente del hook
            const response = await uploadAudio(file);
            console.log("📥 Respuesta directa en App:", response);
            
            if (response) {
              console.log("🔄 Adaptando respuesta...");
              const newMappings = adaptFastAPIResponse(response);
              console.log("✅ Resultados del servidor FastAPI:", newMappings.length);
              console.log("📊 Segmentos:", newMappings);
              
              // Establecer el último segmento como seleccionado
              const tam = newMappings.length > 0 ? newMappings.length - 1 : 0;
              setSelectedIndex(tam);
            } else {
              console.log("⚠️ No hay respuesta del servidor");
            }
            
            setIsTraining(true);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            alert(errorMessage);
            setIsTraining(true);
          }
        }}
      >
        {isTraining ? "Procesar con FastAPI" : (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Procesando...
          </span>
        )}
      </button>
      <SegmentList />
    </div>
  );
}

export default App;
