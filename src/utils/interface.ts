export interface TimeRange {
  start: number
  end: number
}
export interface Speaker {
    name: string
}
export interface Transcript {
    text: string
    model: "auto" | "manual"
}

export interface AudioSegment {
    id: number;
    type: "speaker" | "silence" | "other";
    timeRange: TimeRange;
    speaker: Speaker;
    transcript: Transcript;
}

  