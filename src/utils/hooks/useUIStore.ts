import { create } from "zustand";

interface UIStore {
    modal: boolean;
    selectedIndex: number;
    language: string;
    isTraining: boolean;
    isDragging: boolean;
    
    // Acciones para la UI
    setModal: (open: boolean) => void;
    setSelectedIndex: (index: number) => void;
    setLanguage: (language: string) => void;
    setIsTraining: (training: boolean) => void;
    setIsDragging: (dragging: boolean) => void;
    
    // Acciones compuestas
    handleOpenModal: (index: number) => void;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
    modal: false,
    selectedIndex: -1, // -1 significa que no hay selección
    language: "en",
    isTraining: true,
    isDragging: false,
    
    setModal: (modal: boolean) => set({ modal }),
    setSelectedIndex: (selectedIndex: number) => set({ selectedIndex }),
    setLanguage: (language: string) => set({ language }),
    setIsTraining: (isTraining: boolean) => set({ isTraining }),
    setIsDragging: (isDragging: boolean) => set({ isDragging }),
    
    handleOpenModal: (index: number) => {
        set({ selectedIndex: index, modal: true });
    },
    
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        set({ isDragging: true });
    },
    
    handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        set({ isDragging: false });
    },
})); 