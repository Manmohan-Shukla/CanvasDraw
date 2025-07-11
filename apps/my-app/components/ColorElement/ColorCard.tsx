import ColorCarousel from "./ColorCarousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { GameClass } from "@/draw/GameClass";
import { useState } from "react";
// props/GameProps.ts

export interface GameProps {
  game: GameClass;
}

export default function ColorCard({ game }: GameProps) {
  const [strokeWidth, setStrokeWidth] = useState(5);

  const handleChange = (value: number[]) => {
    const width = value[0];
    setStrokeWidth(width);
    game.strokeWidth(width);
  };
  return (
    <div className="absolute w-40 left-10  top-80">
      <Card className="bg-gray-800 border-none   text-white rounded-xl">
        <CardContent>
          <Slider
            id="strokeWidth"
            min={1}
            max={20}
            value={[strokeWidth]}
            onValueChange={handleChange}
          />
        </CardContent>
        <CardFooter>
          <ColorCarousel />
        </CardFooter>
      </Card>
    </div>
  );
}
