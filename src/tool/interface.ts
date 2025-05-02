interface TimeRange {
  start: number
  end: number
}
interface Speaker {
    id: string
    name: string
}
interface Transcript {
    text: string
    model: "auto" | "manual"
}

export interface AudioSegment {
    id: number;
    type: "speaker" | "silence" | "other";
    timeRange?: TimeRange;
    speaker?: Speaker;
    transcript?: Transcript;
}
