import { Tool } from "@/@types/ToolType";
import getExistingShapes from "./http";
import { Shape } from "@/@types/ShapeType";

export class GameClass {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[] = [];
  private roomId: string;
  private socket: WebSocket;
  private clicked = false;
  private startX = 0;
  private startY = 0;
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
    if (shape.type === "rectangle") {
      this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      this.ctx.beginPath();
      this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  private createShape(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): Shape | null {
    const selected = this.selected;

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

  private mouseDownHandler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };

  private mouseUpHandler = (e: MouseEvent) => {
    if (!this.clicked) return;
    this.clicked = false;

    const shape = this.createShape(
      this.startX,
      this.startY,
      e.clientX,
      e.clientY
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
    const shape = this.createShape(
      this.startX,
      this.startY,
      e.clientX,
      e.clientY
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
}
