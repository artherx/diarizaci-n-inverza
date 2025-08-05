import { AudioSegment } from "../interface";
import { create } from "zustand";

interface SegmentStore {
    segments: AudioSegment[];
    
    // Acciones para los segmentos
    setSegments: (segments: AudioSegment[]) => void;
    addSegment: (segment: AudioSegment) => void;
    removeSegment: (id: number) => void;
    clearSegments: () => void;
    updateSegmentText: (text: string, index: number) => void;
}

export const useSegmentStore = create<SegmentStore>((set, get) => ({
    segments: [],
    
    setSegments: (segments: AudioSegment[]) => set({ segments }),
    
    addSegment: (segment: AudioSegment) => {
        const currentSegments = get().segments;
        set({ segments: [...currentSegments, segment] });
    },
    
    removeSegment: (id: number) => {
        const currentSegments = get().segments;
        set({ segments: currentSegments.filter((seg) => seg.id !== id) });
    },
    
    clearSegments: () => set({ segments: [] }),
    
    updateSegmentText: (text: string, index: number) => {
        const { segments } = get();
        if (index < 0 || index >= segments.length) return;
        
        const updated = segments.map((seg, idx) => {
            if (idx === index) {
                return {
                    ...seg,
                    transcript: {
                        ...seg.transcript,
                        text,
                    },
                };
            }
            return seg;
        });
        set({ segments: updated });
    },
}));