"use client";

import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  const [chats, setChats] = useState(messages);
  const [currentMessage, setCurrentmessage] = useState("");
  const { socket, loading } = useSocket();
  useEffect(() => {
    if (socket && !loading) {
      console.log("socket open", id);
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );
      console.log("after open");
      socket.onmessage = (event) => {
        console.log("socket on message");
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          setChats((c) => [...c, { message: parsedData.message }]);
        }
      };
    }
  }, [socket, loading, id]);

  return (
    <div>
      {chats.map((m) => (
        <div key={id}>{m.message}</div>
      ))}

      <input
        type="text"
        value={currentMessage}
        placeholder="type_here"
        onChange={(e) => {
          setCurrentmessage(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          console.log("button");
          socket?.send(
            JSON.stringify({
              type: "chat",
              roomId: id,
              message: currentMessage,
            })
          );
          setCurrentmessage("");
        }}
      >
        SendMEssage
      </button>
    </div>
  );
}
