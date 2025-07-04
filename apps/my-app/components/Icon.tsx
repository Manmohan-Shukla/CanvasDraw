import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  name: string;
  activated: boolean;
}

export default function IconButton({
  icon,
  onClick,
  name,
  activated,
}: IconButtonProps) {
  return (
    <div className="flex ">
      <HoverCard>
        <HoverCardTrigger>
          <div
            className={`cursor-pointer ${activated ? "text-red-500" : "text-white"}  hover:text-red-400 p-2 bg-gray-900 hover:bg-gray-800`}
            onClick={onClick}
          >
            {icon}
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          sideOffset={12}
          className="bg-gray-800 border-none text-sm px-4 py-1 rounded-xl shadow-lg w-full text-white"
        >
          {name}
        </HoverCardContent>
      </HoverCard>
      <div className="h-5 mt-2.5">
        <Separator orientation="vertical" />
      </div>
    </div>
  );
}
