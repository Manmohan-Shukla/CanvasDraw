"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import MockCanvas from "./MockCanvas";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-full text-gray-300 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Now with real-time collaboration
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white">
            Create, Collaborate,{" "}
            <span className="gradient-text">Visualize</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            The ultimate whiteboard for teams. Draw diagrams, sketch ideas, and
            collaborate in real-time with anyone, anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-white cursor-pointer hover:bg-gray-200 text-black text-lg px-8 py-4"
              onClick={() => {
                router.push(`/login`);
              }}
            >
              Start Drawing Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <MockCanvas />
        </div>
      </div>
    </section>
  );
};

export default Hero;
