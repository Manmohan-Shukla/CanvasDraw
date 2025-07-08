"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import LoadingSpinner from "./LoadingSpinner";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const ws = new WebSocket(`${WS_URL}${token}`);

    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );
    };

    // Cleanup socket on unmount
    return () => {
      ws.close();
    };
  }, [roomId]);

  if (!socket) {
    return (
      <div>
        <LoadingSpinner variant="room" />
      </div>
    );
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
