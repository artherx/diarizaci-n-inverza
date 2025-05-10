import { TranscriptUtterance, TranscriptWord } from "assemblyai";
import { AudioSegment, Speaker, TimeRange, Transcript } from "../interface";
import { diferenciaX } from "./diferencia.hook";

interface propRun {
  file: File | null;
  language_code: string;
}
interface propaddDato {
  id: number;
  type: "speaker" | "other";
  timeRange: TimeRange;
  speaker: Speaker;
  transcript: Transcript;
}
interface propAdapter {
  proprun: propRun;
  vacion: number;
  objeto: any;
}

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
    if (indexx === 0) {
      const currentStart = utterance.start;
      const diferencia = diferenciaX(currentStart, 0);
      if (diferencia >= vacio) {
        console.log(
          `Pausa inicial detectada entre: "${0}" y "${currentStart}"`
        );
        newMappings.push(
          Void({
            id: indexx,
            type: "silence",
            timeRange: {
              start: 0,
              end: currentStart,
            },
            speaker: {
              id: utterance.confidence.toString(),
              name: "void",
            },
            transcript: {
              text: "[...]",
              model: "auto",
            },
          })
        );
        console.log("Void del inicio", newMappings);
      }
    }
    newMappings.push(
      addDato({
        id: indexx,
        type: "speaker",
        timeRange: {
          start: utterance.start,
          end: utterance.end,
        },
        speaker: {
          id: utterance.confidence.toString(),
          name: utterance.speaker ?? "noname",
        },
        transcript: {
          text: utterance.text,
          model: "auto",
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
            Void({
              id: word.confidence,
              type: "silence",
              timeRange: {
                start: word.start,
                end: word.end,
              },
              speaker: {
                id: utterance.confidence.toString(),
                name: "void",
              },
              transcript: {
                text: "[...]",
                model: "auto",
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
function addDato(prop: propaddDato): AudioSegment {
  return {
    id: prop.id,
    type: prop.type,
    timeRange: {
      start: prop.timeRange.start,
      end: prop.timeRange.end,
    },
    speaker: {
      id: prop.speaker.id,
      name: prop.speaker.name,
    },
    transcript: {
      text: prop.transcript.text,
      model: "auto",
    },
  };
}

function Void(prop: AudioSegment): AudioSegment {
  return {
    id: prop.id,
    type: "silence",
    timeRange: {
      start: prop.timeRange.start,
      end: prop.timeRange.end,
    },
    speaker: {
      id: prop.speaker.name,
      name: prop.speaker.name,
    },
    transcript: {
      text: prop.transcript.text,
      model: "auto",
    },
  };
}
