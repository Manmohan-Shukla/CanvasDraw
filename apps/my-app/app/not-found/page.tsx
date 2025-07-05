"use client";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";
import { FRONTEND_URL } from "@/config";

const NotFound = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">CanvasDraw</h1>
            <p className="text-lg text-gray-300">
              Collaborative drawing made simple
            </p>
          </div>
        </div>
      </div>

      {/* 404 Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="border-2 border-gray-700 bg-black max-w-md w-full">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-red-600" />
              </div>
              <CardTitle className="text-4xl text-white mb-2">404</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Oops! Page not found
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-400">
                The page you are looking for doesnot exist or has been moved.
              </p>
              <p className="text-sm text-gray-500">
                Route:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  {pathname}
                </code>
              </p>
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  onClick={() => (window.location.href = `${FRONTEND_URL}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Return to Dashboard
                </Button>
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  className="border-gray-600 bg-black hover:bg-gray-800 text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Need help? Try visiting our homepage or check if the URL is correct.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
