import { Shape } from "@/@types/ShapeType";

export default function createShape(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  selected: string
): Shape | null {
  if (selected === "rectangle") {
    return {
      type: "rectangle",
      x: x1,
      y: y1,
      width: x2 - x1,
      height: y2 - y1,
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
    };
  }

  return null;
}
