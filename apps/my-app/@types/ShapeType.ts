export type Shape =
  | {
      type: "rectangle" | "square";
      x: number;
      y: number;
      width: number;
      height: number;
      strokeWidth: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
      strokeWidth: number;
    }
  | {
      type: "triangle";
      points: { x: number; y: number }[];
      strokeWidth: number;
    };
