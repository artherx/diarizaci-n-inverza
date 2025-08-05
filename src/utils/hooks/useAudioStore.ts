import { create } from "zustand";

interface AudioStore {
    file: File;
    audioUrl: string;
    hasFile: boolean;
    
    // Acciones para el archivo
    setFile: (file: File) => void;
    setAudioUrl: (url: string) => void;
    clearFile: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
    file: new File([], ""),
    audioUrl: "",
    hasFile: false,
    
    setFile: (file: File) => {
        const url = URL.createObjectURL(file);
        set({ file, audioUrl: url, hasFile: true });
    },
    
    setAudioUrl: (audioUrl: string) => set({ audioUrl }),
    
    clearFile: () => {
        set({ 
            file: new File([], ""), 
            audioUrl: "", 
            hasFile: false 
        });
    },
    
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            get().setFile(file);
        }
    },
    
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            get().setFile(e.dataTransfer.files[0]);
        }
    },
})); 