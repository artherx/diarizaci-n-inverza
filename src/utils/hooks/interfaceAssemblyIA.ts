interface word {
  confidence: number;
  end: number;
  speaker: string;
  text: string;
  start: number;
}

export interface utterance {
  confidence: number;
  end: number;
  speaker: string;
  text: string;
  start: number;
  words: word[];
}
