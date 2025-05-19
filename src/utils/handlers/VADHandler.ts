import { AudioSegment } from "../interface";
import { AbstractHandler } from "./ChainResponsibiliti";


export class VADHandler extends AbstractHandler {
  public override handle(audio: AudioSegment[]): void {
    const isValid = audio.length > 0; // ejemplo simple
    if (!isValid) {
      console.warn("Archivo no compatible");
      return;
    }

    console.log("Audio compatible");
    super.callNext(audio);
  }
}
