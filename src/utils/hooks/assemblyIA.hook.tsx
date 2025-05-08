import { AssemblyAI, SpeechModel } from "assemblyai";

export const useAssemblyIA = (file: File | null) => {
  const audioIA = import.meta.env.VITE_API_ASSEMBLYIA;
  const client = new AssemblyAI({
    apiKey: audioIA,
  });

  return async (language_code: string = "en") => {
    if (!file) {
      console.log("No hay audio");
      return;
    }

    const params = {
      audio: file,
      speech_model: "universal" as SpeechModel,
      language_code: language_code,
    };

    try {
      const transcript = await client.transcripts.transcribe(params);
      console.log("llegó:", transcript.text);
    } catch (error) {
      console.error("Error transcribiendo:", error);
    }
  };
};
