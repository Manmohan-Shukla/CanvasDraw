"use client";

import { useEffect, useState } from "react";
import { Room } from "@/@types/RoomType";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loader from "@/components/LoadingSpinner"; // 👈 your loader component

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
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

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Loader variant="canvas" />
      </div>
    );
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
          Back to Dashboard
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="bg-black border-gray-700 text-white">
            <CardHeader>
              <CardTitle>{room.slug}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Room ID: {room.id}</p>
              </div>
              <Button
                onClick={() => router.push(`/canvas/${room.id}`)}
                className="bg-black border border-gray-600 hover:bg-gray-800 text-white cursor-pointer"
              >
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
