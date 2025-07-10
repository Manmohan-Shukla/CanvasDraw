"use client";

import { useEffect, useState } from "react";
import { Room } from "@/@types/RoomType";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import Loader from "@/components/LoadingSpinner"; // 👈 your loader component
import { ArrowBigLeft, MoveLeft, MoveRight } from "lucide-react";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(res.data.rooms);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load rooms.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Loader variant="canvas" />
      </div>
    );
  }

  async function deleteRoom(slug: string) {
    try {
      await axios.delete(`${BACKEND_URL}/room`, {
        data: { slug },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchRooms();
      toast.success("Room deleted successfully");
    } catch (e) {
      console.error(e);
      toast.error("Room cannot be deleted");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-white mb-6">Your Rooms</h1>
        <Button
          className="bg-black border border-gray-600 hover:bg-gray-800 text-white cursor-pointer"
          onClick={() => {
            router.push(`/canvas`);
          }}
        >
          <MoveLeft /> Back to Dashboard
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="bg-black border-gray-700 text-white">
            <Toaster richColors position="top-right" />
            <CardHeader>
              <CardTitle>{room.slug}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Room ID: {room.id}</p>
              </div>
              <div className="flex gap-2 ">
                <Button
                  onClick={() => router.push(`/canvas/${room.id}`)}
                  className="bg-black border border-gray-600 hover:bg-gray-800 text-white cursor-pointer"
                >
                  Open
                </Button>
                <Button
                  onClick={() => deleteRoom(room.slug)}
                  className="bg-black border border-gray-600 hover:text-red-500 hover:border-red-500 hover:bg-gray-800 text-white cursor-pointer"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
