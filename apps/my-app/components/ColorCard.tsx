import ColorCarousel from "./ColorCarousel";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Slider } from "./ui/slider";
export default function ColorCard() {
  return (
    <div className="absolute w-40 left-10  top-80">
      <Card className="bg-gray-800 border-none   text-white rounded-xl">
        <CardContent>
          <Slider />
        </CardContent>
        <CardFooter>
          <ColorCarousel />
        </CardFooter>
      </Card>
    </div>
  );
}
