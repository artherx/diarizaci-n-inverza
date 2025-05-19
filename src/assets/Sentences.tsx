import { TimeToPorcent } from "../utils/hooks/logica.hook";
import { PointCloes, PointOpen } from "./Points";

interface PointProps {
  type: "open" | "close";
  typespeker: "speaker" | "silence" | "other";
  post?: number;
  total?: number;
}

export const Sentences = ({
  type,
  typespeker,
  post = 0,
  total = 100,
}: PointProps) => {
  const proton = TimeToPorcent(post, total);

  return (
    <>
      {type === "open" ? (
        typespeker === "speaker" ? (
          <PointOpen proton={proton} color={"red-500"} />
        ) : (
          <PointOpen proton={proton} color={"blue-500"} />
        )
      ) : typespeker === "speaker" ? (
        <PointCloes proton={proton} color={"red-500"} />
      ) : (
        <PointCloes proton={proton} color={"blue-500"} />
      )}
    </>
  );
};
