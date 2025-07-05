import { RoomCanvas } from "@/components/RoomCanvas";
interface Params {
  params: Promise<{ roomId: string }>;
}

export default async function CanvasPage({ params }: Params) {
  return <RoomCanvas roomId={(await params).roomId} />;
}
