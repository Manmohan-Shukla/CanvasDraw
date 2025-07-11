export interface Shape {
  type: "rectangle" | "circle";
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  centerX?: number;
  centerY?: number;
  radius?: number;

  strokeWidth: number; // ✅ add this
  // You can also add strokeColor, fillColor, etc. later
}
