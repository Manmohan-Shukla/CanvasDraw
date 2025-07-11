import { Tool } from "@/@types/ToolType";
import getExistingShapes from "./http";
import { Shape } from "@/@types/ShapeType";
import createShape from "@/components/Shape/Shape";

export class GameClass {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[] = [];
  private roomId: string;
  private socket: WebSocket;
  private clicked = false;
  private startX = 0;
  private startY = 0;
  private width = 5;
  private selected: Tool = "rectangle";

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.socket = socket;

    this.init();
    this.initHandler();
    this.initMouseHandler();
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  private drawShape(shape: Shape) {
    this.ctx.lineWidth = shape.strokeWidth;
    if (shape.type === "rectangle") {
      //@ts-expect-error jjj
      this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      this.ctx.beginPath();
      //@ts-expect-error jjj
      this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  private mouseDownHandler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };

  private mouseUpHandler = (e: MouseEvent) => {
    if (!this.clicked) return;
    this.clicked = false;

    const shape = createShape(
      this.startX,
      this.startY,
      e.clientX,
      e.clientY,
      this.selected,
      this.width
    );
    if (!shape) return;

    this.existingShapes.push(shape);
    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId: this.roomId,
      })
    );

    this.clearCanvas();
  };

  private mouseMoveHandler = (e: MouseEvent) => {
    if (!this.clicked) return;

    this.clearCanvas();
    const shape = createShape(
      this.startX,
      this.startY,
      e.clientX,
      e.clientY,
      this.selected,
      this.width
    );
    if (shape) this.drawShape(shape);
  };

  private initHandler() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }

  setTool(tool: Tool) {
    this.selected = tool;
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0,0,0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.strokeStyle = "rgba(255,255,255)";
    for (const shape of this.existingShapes) {
      this.drawShape(shape);
    }
  }

  private initMouseHandler() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }

  public strokeWidth(e: number) {
    this.width = Number(e);
    this.ctx.lineWidth = this.width;
  }
}
