import React from "react";
import { useAudioStore } from "../utils/hooks/useAudioStore";
import { useUIStore } from "../utils/hooks/useUIStore";

const DropArea: React.FC = () => {
  const { file, hasFile, handleFileChange, clearFile, handleDrop } = useAudioStore();
  const { isDragging, handleDragOver, handleDragLeave } = useUIStore();

  return hasFile ? (
    <div className="w-full flex flex-col items-center gap-2 bg-gray-800/80 border border-amber-400 rounded-lg p-4 mb-2">
      <span className="text-amber-200 font-semibold">Archivo seleccionado:</span>
      <span className="text-white font-mono text-sm truncate max-w-xs">{file.name}</span>
      <div className="flex gap-4 mt-2">
        <label className="bg-amber-400 hover:bg-amber-500 text-gray-900 px-4 py-1 rounded cursor-pointer font-semibold transition">
          Reemplazar
          <input type="file"  onChange={handleFileChange} className="hidden" />
        </label>
        <button onClick={clearFile} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded font-semibold transition">Quitar</button>
      </div>
    </div>
  ) : (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`w-full flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition min-h-[120px] mb-2 ${isDragging ? 'border-amber-400 bg-amber-900/20' : 'border-gray-600 bg-gray-800/60'}`}
      style={{maxHeight: '20vh'}}
    >
      <span className="text-amber-200 mb-1">Arrastra tu archivo aquí</span>
      <label className="flex flex-col items-center cursor-pointer bg-gray-800 hover:bg-gray-700 text-amber-200 px-6 py-2 rounded-lg shadow transition mt-2">
        <span className="mb-1">o selecciona un archivo de audio</span>
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
};

export default DropArea; 