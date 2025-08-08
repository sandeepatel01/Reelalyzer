// components/Loader.tsx
interface LoaderProps {
  progress: number;
}

const Loader = ({ progress }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
      {/* Animated dots loader */}
      <div className="flex space-x-2">
        <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce"></div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">
          Analyzing your reel... {progress}%
        </p>
      </div>

      {/* Helpful message */}
      <p className="text-center text-gray-500 max-w-md px-4">
        This usually takes 15-30 seconds. Please don&#39;t close this window.
      </p>
    </div>
  );
};

export default Loader;
