import { WS_URL } from "@/.env";
import { useEffect, useState } from "react";

export function useSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    const handleOpen = () => {
      setLoading(false);
      setSocket(ws);
      console.log("WebSocket connected ✅");
    };

    const handleError = (e: Event) => {
      console.error("WebSocket error ❌", e);
      setLoading(false);
    };

    const handleClose = () => {
      console.warn("WebSocket closed 🚪");

      setLoading(false);
    };

    ws.addEventListener("open", handleOpen);
    ws.addEventListener("error", handleError);
    ws.addEventListener("close", handleClose);

    return () => {
      ws.removeEventListener("open", handleOpen);
      ws.removeEventListener("error", handleError);
      ws.removeEventListener("close", handleClose);
      ws.close(); // Clean up
    };
  }, []);

  return {
    socket,
    loading,
  };
}
