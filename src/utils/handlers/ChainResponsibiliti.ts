import { AudioSegment } from "../interface";
import { Handler } from "./Handler";

export abstract class AbstractHandler implements Handler {
    public abstract handle(audio: AudioSegment[]): void;
    private next: Handler | null = null;
    
    public setNext(handler: Handler): Handler {
        this.next = handler;
        return handler;
    }
    public callNext(audio: AudioSegment[]): void {
        if(this.next){
            this.next.handle(audio);
        }
    }
}