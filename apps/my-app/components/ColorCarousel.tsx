function ColorButton({ color }: { color: string }) {
  return (
    <div className={`rounded-full ${color} w-5 h-5 hover:w-6 hover:h-6`}></div>
  );
}

export default function ColorCarousel() {
  return (
    <div className="flex gap-1.5 h-5 bg-gray-800">
      <ColorButton color={"bg-white"} />
      <ColorButton color={"bg-blue-500"} />
      <ColorButton color={"bg-red-500"} />
      <ColorButton color={"bg-green-500"} />
      <ColorButton color={"bg-black"} />
    </div>
  );
}
