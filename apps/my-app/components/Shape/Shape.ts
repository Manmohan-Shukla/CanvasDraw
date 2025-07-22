import { Shape } from "@/@types/ShapeType";

export default function createShape(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  selected: string,
  strokeWidth: number
): Shape | null {
  if (selected === "rectangle") {
    return {
      type: "rectangle",
      x: x1,
      y: y1,
      width: x2 - x1,
      height: y2 - y1,
      strokeWidth,
    };
  }
  if (selected === "square") {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const side = Math.min(Math.abs(dx), Math.abs(dy));

    const x = dx >= 0 ? x1 : x1 - side;
    const y = dy >= 0 ? y1 : y1 - side;

    return {
      type: "square",
      x,
      y,
      width: side,
      height: side,
      strokeWidth,
    };
  }

  if (selected === "circle") {
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const radius = Math.sqrt(dx * dx + dy * dy) / 2;

    return {
      type: "circle",
      centerX,
      centerY,
      radius,
      strokeWidth,
    };
  }

  if (selected === "triangle") {
    const topX = (x1 + x2) / 2;
    const topY = y1;
    const leftX = x1;
    const leftY = y2;
    const rightX = x2;
    const rightY = y2;

    return {
      type: "triangle",
      points: [
        { x: topX, y: topY }, // top
        { x: leftX, y: leftY }, // bottom-left
        { x: rightX, y: rightY }, // bottom-right
      ],
      strokeWidth,
    };
  }

  return null;
}
