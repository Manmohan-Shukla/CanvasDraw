export default function MockCanvas() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
        <div className="bg-black rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="text-sm text-gray-500">canvasdraw.app</div>
          </div>

          {/* Mock Canvas */}
          <div className="h-64 sm:h-80 bg-gray-900 rounded-lg relative overflow-hidden">
            <div className="absolute top-4 left-4 w-24 h-16 bg-gray-700 rounded-lg animate-pulse-slow"></div>
            <div className="absolute top-12 right-8 w-20 h-20 bg-blue-200 rounded-full animate-float"></div>
            <div className="absolute bottom-8 left-12 w-32 h-8 bg-gray-600 rounded-full"></div>
            <div
              className="absolute bottom-12 right-12 w-16 h-24 bg-purple-200 rounded-lg"
              style={{ transform: "rotate(15deg)" }}
            ></div>

            {/* Collaboration cursors */}
            <div className="absolute top-20 left-32 flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                Sarah
              </div>
            </div>
            <div className="absolute bottom-16 right-24 flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <div className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                Mike
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-gray-800 rounded-full animate-float opacity-60"></div>
      <div
        className="absolute -bottom-6 -right-6 w-20 h-20 bg-gray-700 rounded-lg animate-pulse-fast opacity-60"
        style={{ transform: "rotate(-15deg)" }}
      ></div>
    </div>
  );
}
