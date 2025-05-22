import { TranscriptUtterance, TranscriptWord } from "assemblyai";
import { AudioSegment, VoidProp } from "../interface";
import { diferenciaX, MilisegundostoSecongs } from "./logica.hook";

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
  const newMappings: AudioSegment[] = [];
  const vacio = prop.vacion;
  const result: TranscriptUtterance[] = prop.objeto.utterances;
  const audioTime =
    new Audio(URL.createObjectURL(prop.proprun.file)).duration * 1000;
  console.log("Resultados de la transcripción:", result);
  result.map((utterance, indexx) => {
    const words: TranscriptWord[] = utterance.words;
    voidProp.id = indexx;
    if (indexx === 0) {
      const currentStart = utterance.start;
      const diferencia = diferenciaX(currentStart, 0);
      if (diferencia >= vacio) {
        console.log(
          `Pausa inicial detectada entre: "${0}" y "${currentStart}"`
        );
        newMappings.push(
          addDato({
            ...voidProp,
            timeRange: {
              ...voidProp.timeRange,
              end: MilisegundostoSecongs(currentStart),
            },
          })
        );
        console.log("Void del inicio", newMappings);
      }
    }
    newMappings.push(
      addDato({
        ...voidProp,
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
      })
    );
    words.map((word, index) => {
      if (index < words.length - 1) {
        const currentEnd = word.end;
        const nextStart = words[index + 1].start;
        const diferencia = diferenciaX(currentEnd, nextStart);
        if (diferencia >= vacio) {
          newMappings.push(
            addDato({
              ...voidProp,
              timeRange: {
                start: MilisegundostoSecongs(word.start),
                end: MilisegundostoSecongs(word.end),
              },
            })
          );
          console.log(
            `Pausa detectada entre: "${currentEnd}" y "${nextStart}" en el ${indexx}`
          );
        }
      }

      const currentEnd = utterance.end;
      const diferencia = diferenciaX(currentEnd, audioTime);
      if (diferencia >= vacio) {
        console.log(
          `Pausa final detectada entre: "${currentEnd}" y "${audioTime}"`
        );
      }
    });
  });

  return newMappings;
}
function addDato(prop: AudioSegment): AudioSegment {
  return prop;
}
