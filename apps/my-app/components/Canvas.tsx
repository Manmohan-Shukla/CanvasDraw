import { useEffect, useRef, useState } from "react";

import TopBar from "./TopBar";
import ColorCard from "./ColorCard";
import { Tool } from "@/@types/ToolType";
import { GameClass } from "@/draw/GameClass";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<Tool>("circle");
  const [game, setGame] = useState<GameClass>();
  useEffect(() => {
    console.log(selected, "useEffect");
    game?.setTool(selected);
  }, [selected, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new GameClass(canvasRef.current, roomId, socket);
      setGame(g);
      return () => {
        g.destroy();
      };
    }
    //hot reloading flappy bird harkirat repo
  }, [canvasRef]);
  return (
    <div className="overflow-hidden">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <TopBar selected={selected} setSelected={setSelected} />
      <ColorCard />
    </div>
  );
}
