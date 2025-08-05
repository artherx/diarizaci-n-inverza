import { create } from "zustand";

// Interfaces para la respuesta del servidor FastAPI
interface FastAPISegment {
  start: number;
  end: number;
  duration: number;
  type: number; // 0 = speaker, 1 = silence
}

interface FastAPIData {
  audio_file?: string;
  segments?: FastAPISegment[];
  processing_time_sec?: number;
}

interface FastAPIResponse {
  message: string;
  json_filename: string;
  time_taken: number;
  data: FastAPIData | FastAPISegment[];
}

interface FastAPIStore {
  isLoading: boolean;
  error: string;
  response: FastAPIResponse | null;
  
  // Acciones
  uploadAudio: (file: File) => Promise<FastAPIResponse | null>;
  clearResponse: () => void;
  setError: (error: string) => void;
}

export const useFastAPI = create<FastAPIStore>((set, get) => ({
  isLoading: false,
  error: "",
  response: null,
  
  uploadAudio: async (file: File) => {
    set({ isLoading: true, error: "" });
    
    try {
      console.log("🚀 Iniciando envío de archivo...");
      console.log("📁 Archivo:", file.name, "Tamaño:", file.size);
      console.log("🌐 URL:", import.meta.env.VITE_API_PUERTO);
      
      const formData = new FormData();
      formData.append("file", file);
      
      console.log("📤 Enviando petición POST...");
      const response = await fetch(import.meta.env.VITE_API_PUERTO, {
        method: "POST",
        body: formData,
      });
      
      console.log("📥 Respuesta recibida:", response.status, response.statusText);
      console.log("📋 Headers:", Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log("🔄 Parseando JSON...");
      const data: FastAPIResponse = await response.json();
      console.log("✅ Datos recibidos:", data);
      
      set({ response: data, isLoading: false });
      console.log("💾 Estado actualizado con respuesta");
      return data;
      
    } catch (error) {
      console.error("❌ Error en uploadAudio:", error);
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      set({ error: errorMessage, isLoading: false });
      return null;
    }
  },
  
  clearResponse: () => {
    set({ response: null, error: "" });
  },
  
  setError: (error: string) => {
    set({ error });
  },
}));