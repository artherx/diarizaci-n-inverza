import { AssemblyAI, SpeechModel } from "assemblyai";

export const useAssemblyIA:any = () => {
  const audioIA = import.meta.env.VITE_API_ASSEMBLYIA;
  const client = new AssemblyAI({
    apiKey: audioIA,
  });

  return async (file: File | null, language_code: string = "en") => {
    if (!file) {
      console.log("No hay audio");
      return;
    }

    const params = {
      audio: file,
      speech_model: "universal" as SpeechModel,
      language_code: language_code,
      speaker_labels: true
    };

    try {
      //const pushTransciption = await client.transcripts.submit(params);
      //const transcript = await client.transcripts.waitUntilReady(pushTransciption.id);
      const transcript = await client.transcripts.transcribe(params);
      return transcript;
      
    } catch (error) {
      console.error("Error transcribiendo:", error);
    }
  };
};
