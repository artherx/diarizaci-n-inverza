import { AudioSegment } from "../interface";

export interface Handler {
    setNext(handler: Handler): Handler;
    handle(audio: AudioSegment[]): void;
}