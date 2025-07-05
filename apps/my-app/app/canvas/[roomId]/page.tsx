import { RoomCanvas } from "@/components/RoomCanvas";

interface Params {
  params: { roomId: string };
}

export default function CanvasPage({ params }: Params) {
  return <RoomCanvas roomId={params.roomId} />;
}
