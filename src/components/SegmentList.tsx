import React, { useState, useEffect } from "react";
import { Modal } from "../assets/Modal";
import { useSegmentStore } from "../utils/hooks/UseStoreJson";
import { useUIStore } from "../utils/hooks/useUIStore";

const SegmentList: React.FC = () => {
  // Usar los stores especializados
  const {
    segments,
    updateSegmentText,
  } = useSegmentStore();
  
  const {
    modal,
    selectedIndex,
    handleOpenModal,
    setModal,
  } = useUIStore();

  // Estado local para el texto del input del modal
  const [localText, setLocalText] = useState("");

  // Sincroniza el texto local cuando se abre el modal o cambia el segmento seleccionado
  useEffect(() => {
    if (modal && selectedIndex >= 0 && selectedIndex < segments.length) {
      setLocalText(segments[selectedIndex].transcript.text);
    }
  }, [modal, selectedIndex, segments]);

  return (
    <div
      className="w-full flex-1 min-h-0 overflow-auto rounded-lg bg-gray-800 shadow border border-gray-700 flex flex-col items-center p-4 gap-2"
      style={{ maxHeight: "40vh" }}
    >
      {segments.length > 0 ? (
        segments.map((item, index) =>
          item.type === "silence" ? (
            <div
              className="w-full flex items-center gap-2 bg-gray-700/60 hover:bg-amber-900/30 rounded px-3 py-2 cursor-pointer transition"
              onClick={() => handleOpenModal(index)}
              key={index}
            >
              <span className="text-xs text-amber-400 font-mono">Silencio</span>
              <p className="flex-1 text-gray-300 italic">{item.transcript.text}</p>
              <span className="text-xs text-gray-400">
                {item.timeRange.start.toFixed(2)}s - {item.timeRange.end.toFixed(2)}s
              </span>
            </div>
          ) : (
            <div key={index} className="w-full flex items-center gap-2 bg-gray-900/60 rounded px-3 py-2">
              <span className="text-xs text-green-400 font-mono">{item.speaker.name}</span>
              <p className="flex-1 text-gray-200 font-semibold">{item.transcript.text}</p>
              <span className="text-xs text-gray-400">
                {item.timeRange.start.toFixed(2)}s - {item.timeRange.end.toFixed(2)}s
              </span>
            </div>
          )
        )
      ) : (
        <p className="text-gray-400 italic">No hay segmentos aún.</p>
      )}
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        {selectedIndex >= 0 && selectedIndex < segments.length && (
          <div className="flex flex-col gap-4 bg-gray-900 p-6 rounded-lg shadow-lg">
            <h1 className="text-white text-xl font-bold mb-2">
              Editar Segmento <span className="text-amber-300">{selectedIndex + 1}</span>
              <span className="ml-2 text-xs text-gray-400">ID: {segments[selectedIndex].id}</span>
            </h1>
            <input
              className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
              type="text"
              value={localText}
              onChange={e => setLocalText(e.target.value)}
            />
            <button
              onClick={() => {
                if (selectedIndex >= 0) {
                  updateSegmentText(localText, selectedIndex);
                  setModal(false);
                }
              }}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold transition"
            >
              Guardar
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SegmentList; 