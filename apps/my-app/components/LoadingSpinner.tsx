import { Loader2, Palette, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LoadingSpinnerProps {
  variant?: "default" | "canvas" | "room" | "minimal";
  text?: string;
  size?: "sm" | "md" | "lg";
}

const LoadingSpinner = ({
  variant = "default",
  text,
  size = "md",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const containerSizes = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-white`} />
        {text && <span className="ml-2 text-white text-sm">{text}</span>}
      </div>
    );
  }

  if (variant === "canvas") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="border-2 border-gray-700 bg-black max-w-sm w-full">
          <CardContent className={`text-center ${containerSizes[size]}`}>
            <div className="relative mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center animate-pulse">
                <Palette className="w-8 h-8 text-blue-600 animate-bounce" />
              </div>
              <div className="absolute inset-0 w-16 h-16 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {text || "Loading Canvas..."}
            </h3>
            <p className="text-gray-400 text-sm">
              Preparing your drawing experience
            </p>
            <div className="flex justify-center mt-4 space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-150"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === "room") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="border-2 border-gray-700 bg-black max-w-sm w-full">
          <CardContent className={`text-center ${containerSizes[size]}`}>
            <div className="relative mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600 animate-pulse" />
              </div>
              <div className="absolute inset-0 w-20 h-20 mx-auto border-2 border-green-600 border-t-transparent rounded-full animate-spin opacity-50"></div>
              <div className="absolute inset-0 w-12 h-12 mx-auto border-2 border-green-400 border-b-transparent rounded-full animate-spin animate-reverse opacity-30"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {text || "Joining Room..."}
            </h3>
            <p className="text-gray-400 text-sm">Connecting with other users</p>
            <div className="mt-4">
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full animate-pulse"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <Card className="border-2 border-gray-700 bg-black max-w-sm w-full">
        <CardContent className={`text-center ${containerSizes[size]}`}>
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-50 rounded-full flex items-center justify-center animate-pulse">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <Loader2 className="w-20 h-20 mx-auto text-purple-600 animate-spin absolute inset-0" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {text || "Loading..."}
          </h3>
          <p className="text-gray-400 text-sm">
            Please wait while we prepare everything
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce delay-200"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingSpinner;
