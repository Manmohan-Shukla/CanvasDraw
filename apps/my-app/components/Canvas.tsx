import Draw from "@/draw";
import { useEffect, useRef } from "react";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      Draw(canvasRef.current, roomId, socket);
      //   ctx.strokeRect(25, 25, 100, 100);
    } //hot reloading flappy bird harkirat repo
  }, [canvasRef]);
  return (
    <div>
      <canvas ref={canvasRef} width={2000} height={2000}></canvas>
    </div>
  );
}
