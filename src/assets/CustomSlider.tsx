import { useEffect, useRef, useState } from "react";
import { AudioSegment } from "../utils/interface";
import { Sentences } from "./Sentences";
interface Props {
  data: AudioSegment[];
  tiemTol?: number;
  progress?: number;
}

export const CustomSlider = ({ data, tiemTol = 100, progress }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState<number | null>(null);

  useEffect(() => {
    if (!isDragging && typeof progress === "number") {
      setValue(progress);
    }
  }, [progress, isDragging]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement> | MouseEvent
  ) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let newX = e.clientX - rect.left;

    newX = Math.max(0, Math.min(rect.width, newX)); // clamp
    const percent = (newX / rect.width) * 100;
    if (rect) {
      const relativeX = e.clientX - rect.left;
      setX(relativeX);
    }
    setValue(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setX(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="relative w-[20rem] h-[1rem] cursor-pointer"
    >
      <div className="retalive w-full">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <div key={index}>
                <Sentences
                  type="close"
                  typespeker={item.type}
                  post={item.timeRange.start}
                  total={tiemTol}
                />
                <Sentences
                  type={"open"}
                  typespeker={item.type}
                  post={item.timeRange.end}
                  total={tiemTol}
                />
              </div>
            );
          })}
      </div>
      {/* barra de fondo */}
      <div className="absolute top-1/2 left-0 w-full h-[0.3rem] bg-gray-400 rounded-full transform -translate-y-1/2">
        {x !== null && (
          <div>
            <p
              className="absolute text-[.5rem] bottom-[1rem] left-0 select-none"
              style={{ left: `${x}px` }}
            >
              {value}
            </p>
            <div
              className="absolute top-[-0.4rem] w-[2px] h-[1rem] bg-red-500 pointer-events-none"
              style={{ left: `${x}px` }}
            />
          </div>
        )}
      </div>

      {/* barra de progreso */}
      <div
        className="absolute top-1/2 left-0 h-[0.3rem] bg-blue-500 rounded-full transform -translate-y-1/2"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
