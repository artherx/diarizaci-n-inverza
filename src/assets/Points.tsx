const tailwindColors: Record<Color, string> = {
  "red-500": "#ef4444",
  "blue-500": "#3b82f6",
};

type Color = "red-500" | "blue-500";

interface PointProps {
  proton: number;
  color: Color;
}
export function PointOpen({ proton, color }: PointProps) {
  return (
    <>
      <div
        className={`absolute bottom-5 left-0 w-2 h-2 rounded-full`}
        style={{ left: proton + "%", background: tailwindColors[color] }}
      />
      <div
        id="triangle"
        className={`inline-block absolute bottom-[.5rem] left-[.25rem] w-0 h-0 border-solid border-t-[1rem] border-r-[.25rem] border-l-0 border-b-0 border-l-transparent border-r-transparent border-b-transparent`}
        style={{ left: proton + "%", borderTopColor: tailwindColors[color] }}
      />
    </>
  );
}
export function PointCloes({ proton, color }: PointProps) {
  return (
    <>
      <div
        className={`absolute bottom-5 left-10 w-2 h-2 rounded-full `}
        style={{ left: proton + "%", background: tailwindColors[color] }}
      />
      <div
        id="triangle"
        className={`inline-block absolute bottom-[.5rem] left-0 w-0 h-0 border-solid border-t-[1rem] border-r-0 border-l-[.25rem] border-b-0 border-l-transparent border-r-transparent border-b-transparent`}
        style={{ left: proton + "%", borderTopColor: tailwindColors[color] }}
      />
    </>
  );
}
