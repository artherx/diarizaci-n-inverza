import { AudioSegment, VoidProp } from "../interface";
import { useSegmentStore } from "./UseStoreJson";

interface FastAPISegment {
  start: number;
  end: number;
  duration: number;
  type: number; // 0 = speaker, 1 = silence
}

interface FastAPIData {
  audio_file?: string;
  segments?: FastAPISegment[];
  processing_time_sec?: number;
}

interface FastAPIResponse {
  message: string;
  json_filename: string;
  time_taken: number;
  data: FastAPIData | FastAPISegment[];
}

export function adaptFastAPIResponse(response: FastAPIResponse): AudioSegment[] {
  console.log("🔧 Iniciando adaptación de respuesta FastAPI");
  console.log("📥 Respuesta completa:", response);
  
  const { clearSegments, addSegment } = useSegmentStore.getState();
  
  // Limpiar segmentos existentes
  clearSegments();
  console.log("🧹 Segmentos limpiados");
  
  // Los segmentos están directamente en data, no en data.segments
  const segments = Array.isArray(response.data) ? response.data : response.data.segments || [];
  console.log("📊 Segmentos a procesar:", segments);
  
  if (!segments || segments.length === 0) {
    console.log("⚠️ No hay segmentos para procesar");
    return [];
  }
  
  segments.forEach((segment, index) => {
    console.log(`🔄 Procesando segmento ${index}:`, segment);
    
    const audioSegment: AudioSegment = {
      id: index,
      type: segment.type === 0 ? "speaker" : "silence",
      timeRange: {
        start: segment.start / 1000, // Convertir de milisegundos a segundos
        end: segment.end / 1000,
      },
      speaker: {
        name: segment.type === 0 ? "Speaker" : "void",
      },
      transcript: {
        text: segment.type === 0 ? "Texto del hablante" : "[...]",
        model: "auto",
      },
    };
    
    console.log(`✅ Segmento ${index} creado:`, audioSegment);
    addSegment(audioSegment);
  });
  
  // Obtener los segmentos actualizados del store
  const { segments: updatedSegments } = useSegmentStore.getState();
  console.log("📋 Segmentos finales:", updatedSegments);
  return updatedSegments;
}