export class AudioValidationHandler {
    public fileAudio(file: File): File | void {
        const isAudio = file.type.startsWith("audio/");
        
        if (!isAudio) {
            console.warn("File type not supported");
            return;
        }
        return file;
    }
}
