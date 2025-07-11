"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/LoadingSpinner"; // component

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus, Users, List } from "lucide-react";
import { BACKEND_URL, FRONTEND_URL } from "@/config";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Room } from "@/@types/RoomType";
import { useRouter } from "next/navigation";

const Index = () => {
  const [roomId, setRoomId] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [userRooms, setUserRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [hasToken, setHasToken] = useState<boolean>(false);

  const Out = () => {
    setHasToken(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push(`${FRONTEND_URL}`);
  };

  const Signout = () => {
    return (
      <div className="absolute top-5 right-0 m-4">
        <Button
          variant="outline"
          className="border-gray-700 text-black cursor-pointer hover:bg-gray-200"
          onClick={Out}
        >
          Signout
        </Button>
      </div>
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
    async function room() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserRooms(response.data.rooms);
      } catch (e) {
        console.log(e);
        toast.error("Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    }

    room();
  }, []);

  const handleCreateRoom = async () => {
    if (
      !newRoomName ||
      typeof newRoomName !== "string" ||
      !newRoomName.trim()
    ) {
      toast.error("Room name is required");
      return;
    }

    console.log("Creating room with name:", newRoomName);
    console.log("Creating room:", newRoomName);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/room`,
        { name: newRoomName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(
        `Room has been successfully created RoomId: ${response.data.roomId}`
      );
      router.push(`canvas/${response.data.roomId}`);
    } catch (e) {
      console.log(e);
      toast.error("unable to create room");
    }
    // Room creation logic would go here
  };

  const handleJoinRoom = (roomId: string | number) => {
    if (!roomId || typeof roomId !== "number") {
      toast.error("Invalid room ID ");
      return;
    }
    console.log("Joining room:", roomId);
    const roomId1 = Number(roomId);
    if (!localStorage.getItem("token")) {
      toast.error("unable to join room");
    }
    // const slug = roomId.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(`canvas/${roomId1}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Loader variant="canvas" />
      </div>
    );
  }
  return (
    <div className="min-h-screen scrollbar-none bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">CanvasDraw</h1>
            <p className="text-lg text-gray-300">
              Collaborative drawing made simple
            </p>
          </div>
          {hasToken && <Signout />}
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-12 ">
        {/* Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Create New Room Card */}
          <Card className="border-2 border-gray-700 hover:border-blue-600 hover:shadow-lg transition-all duration-300 group bg-black">
            <Toaster richColors position="top-right" />
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Plus className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-white">
                Create New Room
              </CardTitle>
              <CardDescription className="text-gray-300">
                Start a fresh collaborative drawing session
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-black border cursor-pointer border-gray-600 hover:bg-gray-800 text-white">
                    Create Room
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-black border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      Create New Room
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Give your drawing room a memorable name
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="roomName" className="text-white">
                        Room Name
                      </Label>
                      <Input
                        id="roomName"
                        placeholder="My Awesome Drawing Room"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        className="text-white bg-gray-800 border-gray-600"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleCreateRoom}
                      className="bg-black border cursor-pointer border-gray-600 hover:bg-gray-800 text-white"
                    >
                      Create Room
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Join Room Card */}
          <Card className="border-2 border-gray-700 hover:border-green-600 hover:shadow-lg transition-all duration-300 group bg-black">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-white">Join Room</CardTitle>
              <CardDescription className="text-gray-300">
                Enter a room using its unique slug or invite code
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 cursor-pointer bg-black hover:bg-gray-800 text-white "
                  >
                    Join Room
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-black border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Join Room</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Enter the room slug or invite code to join
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="roomId" className="text-white">
                        Room Slug or Code
                      </Label>
                      <Input
                        id="roomId"
                        placeholder="design-sprint-2024"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="text-white bg-gray-800 border-gray-600"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        handleJoinRoom(Number(roomId));
                      }}
                      className="bg-black border border-gray-600 cursor-pointer hover:bg-gray-800 text-white"
                    >
                      Join Room
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* List Rooms Card */}
          <Card className="border-2 border-gray-700 hover:border-purple-600 hover:shadow-lg transition-all duration-300 group md:col-span-2 lg:col-span-1 bg-black">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                <List className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-white">My Rooms</CardTitle>
              <CardDescription className="text-gray-300">
                View and manage your drawing rooms
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                variant="outline"
                className="w-full border-gray-600 bg-black hover:bg-gray-800 text-white cursor-pointer"
                onClick={() => {
                  router.push(`/canvas/room`);
                }}
              >
                View All Rooms
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Rooms Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Recent Rooms</h2>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
              onClick={() => {
                router.push(`/canvas/room`);
              }}
            >
              View All
            </Button>
          </div>

          <div className="grid gap-4">
            {[...userRooms]
              .sort((a, b) => b.id - a.id)
              .slice(0, 3)
              .map((room) => (
                <Card
                  key={room.id}
                  className="border border-gray-700 hover:shadow-md transition-shadow bg-black"
                >
                  <CardContent className="p-6 overflow-ellipsis">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {/* <h3 className="text-lg font-medium text-white">
                          {room.name}
                        </h3> */}
                          {/* <Badge
                          variant={
                            room.status === "active" ? "default" : "secondary"
                          }
                          className={
                            room.status === "active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "text-white bg-gray-700"
                          }
                        >
                          {room.status}
                        </Badge> */}
                        </div>
                        <p className="text-sm text-gray-300 mb-1">
                          Slug: {room.slug}
                        </p>
                        <p className="text-sm text-gray-400">
                          RoomId: {room.id}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-black border border-gray-600 hover:bg-gray-800 text-white cursor-pointer"
                          onClick={() => {
                            // or room.slug depending on your logic
                            handleJoinRoom(room.id);
                          }}
                        >
                          Open
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 bg-black hover:bg-gray-800 text-white cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}/canvas/${room.id}`
                            );
                            toast.success("Room link copied!");
                          }}
                        >
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Quick Stats */}
        <Separator className="my-12 bg-gray-700" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-1">
              {userRooms.length}
            </div>
            <div className="text-gray-300">Total Rooms</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">47</div>
            <div className="text-gray-300">Drawings Created</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">156</div>
            <div className="text-gray-300">Hours Collaborated</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
