import { TranscriptUtterance, TranscriptWord } from "assemblyai";
import { AudioSegment, VoidProp } from "../interface";
import { diferenciaX, MilisegundostoSecongs } from "./logica.hook";
import { useSegmentStore } from "./UseStoreJson";

interface propRun {
  file: File | null;
  language_code: string;
}
interface propAdapter {
  proprun: propRun;
  vacion: number;
  objeto: any;
}

const voidProp = VoidProp;

export function adapterIA(prop: propAdapter): AudioSegment[] {
  if (!prop.proprun.file) {
    alert("Por favor selecciona un archivo de audio.");
    return [];
  }
  
  const { clearSegments, addSegment } = useSegmentStore.getState();
  
  // Limpiar segmentos existentes antes de procesar nuevos
  clearSegments();
  
  const vacio = prop.vacion;
  const result: TranscriptUtterance[] = prop.objeto.utterances;
  const audioTime = new Audio(URL.createObjectURL(prop.proprun.file)).duration * 1000;
  
  console.log("Resultados de la transcripción:", result);
  
  result.forEach((utterance, indexx) => {
    const words: TranscriptWord[] = utterance.words;
    
    // Verificar pausa inicial
    if (indexx === 0) {
      const currentStart = utterance.start;
      const diferencia = diferenciaX(currentStart, 0);
      if (diferencia >= vacio) {
        console.log(`Pausa inicial detectada entre: "${0}" y "${currentStart}"`);
                 addSegment({
           ...voidProp,
           id: 0,
           timeRange: { 
             start: 0, 
             end: MilisegundostoSecongs(currentStart)
           }
         });
      }
    }
    
         // Agregar segmento de hablante
     addSegment({
       ...voidProp,
       id: indexx + (indexx === 0 && utterance.start > vacio ? 1 : 0),
       type: "speaker",
       timeRange: {
         start: MilisegundostoSecongs(utterance.start),
         end: MilisegundostoSecongs(utterance.end),
       },
       speaker: {
         name: "noName",
       },
       transcript: {
         ...voidProp.transcript,
         text: utterance.text,
       },
     });
    
    // Verificar pausas entre palabras
    words.forEach((word, index) => {
      if (index < words.length - 1) {
        const currentEnd = word.end;
        const nextStart = words[index + 1].start;
        const diferencia = diferenciaX(currentEnd, nextStart);
        if (diferencia >= vacio) {
                     addSegment({
             ...voidProp,
             id: Date.now() + index, // ID único temporal
             timeRange: {
               start: MilisegundostoSecongs(currentEnd),
               end: MilisegundostoSecongs(nextStart),
             },
           });
          console.log(`Pausa detectada entre: "${currentEnd}" y "${nextStart}" en el ${indexx}`);
        }
      }
    });
  });
  
  // Verificar pausa final
  if (result.length > 0) {
    const lastUtterance = result[result.length - 1];
    const currentEnd = lastUtterance.end;
    const diferencia = diferenciaX(currentEnd, audioTime);
    if (diferencia >= vacio) {
      console.log(`Pausa final detectada entre: "${currentEnd}" y "${audioTime}"`);
             addSegment({
         ...voidProp,
         id: Date.now() + 999, // ID único temporal
         timeRange: {
           start: MilisegundostoSecongs(currentEnd),
           end: MilisegundostoSecongs(audioTime),
         },
       });
    }
  }
  
  // Obtener los segmentos actualizados del store
  const { segments } = useSegmentStore.getState();
  return segments;
}
