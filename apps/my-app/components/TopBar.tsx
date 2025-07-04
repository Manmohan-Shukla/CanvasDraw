import Iconbotton from "./Icon";
import {
  CaseUpper,
  CircleIcon,
  EraserIcon,
  HandIcon,
  Minus,
  MoveRight,
  PencilIcon,
  RectangleHorizontalIcon,
  SquareIcon,
  TriangleIcon,
} from "lucide-react";

type Tool = "circle" | "rectangle";
// | "pencil"
// | "arrow"
// | "erasure"
// | "triangle"
// | "square"
// | "text"
// | "line"
// | "select";

export default function TopBar({
  selected,
  setSelected,
}: {
  selected: Tool;
  setSelected: (t: Tool) => void;
}) {
  return (
    <div className="absolute top-5  left-1/2 overflow-hidden transform -translate-x-1/2 bg-gray-900 w-102 rounded-xl h-10 shadow">
      <div className="flex  ">
        {/* <Iconbotton
          activated={selected === "select"}
          icon={<HandIcon />}
          onClick={() => {
            setSelected("select");
          }}
          name="select"
        />

        <Iconbotton
          activated={selected === "pencil"}
          icon={<PencilIcon />}
          onClick={() => {
            setSelected("pencil");
          }}
          name="pencil"
        />
        <Iconbotton
          activated={selected === "erasure"}
          icon={<EraserIcon />}
          onClick={() => {
            setSelected("erasure");
          }}
          name="erasure"
        /> */}
        <Iconbotton
          activated={selected === "rectangle"}
          icon={<RectangleHorizontalIcon />}
          onClick={() => {
            setSelected("rectangle");
          }}
          name="rectangle"
        />
        {/* <Iconbotton
          activated={selected === "square"}
          icon={<SquareIcon />}
          onClick={() => {
            setSelected("square");
          }}
          name="square"
        />

        <Iconbotton
          activated={selected === "triangle"}
          icon={<TriangleIcon />}
          onClick={() => {
            setSelected("triangle");
          }}
          name="triangle"
        /> */}
        <Iconbotton
          activated={selected === "circle"}
          icon={<CircleIcon />}
          onClick={() => {
            setSelected("circle");
          }}
          name="circle"
        />
        {/* <Iconbotton
          activated={selected === "arrow"}
          icon={<MoveRight />}
          onClick={() => {
            setSelected("arrow");
          }}
          name="arrow"
        />
        <Iconbotton
          activated={selected === "line"}
          icon={<Minus />}
          onClick={() => {
            setSelected("line");
          }}
          name="line"
        />
        <Iconbotton
          activated={selected === "text"}
          icon={<CaseUpper />}
          onClick={() => {
            setSelected("text");
          }}
          name="text"
        /> */}
      </div>
    </div>
  );
}
