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

export const VoidProp: AudioSegment = {
  id: 0,
  type: "silence",
  timeRange: {
    start: 0,
    end: 0,
  },
  speaker: {
    name: "void",
  },
  transcript: {
    text: "[...]",
    model: "auto",
  },
};
  