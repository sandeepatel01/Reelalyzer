import { Icons } from "./icons";

interface LoaderProps {
  progress: number;
}

const Loader = ({ progress }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full">
      {/* Animated dots */}
      <div className="flex space-x-3">
        <div className="h-3 w-3 bg-[#d87e36] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 bg-[#d87e36] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 bg-[#d87e36] rounded-full animate-bounce"></div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md px-4 sm:px-0">
        <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d87e36] to-[#f0a15e] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center mt-3 text-sm text-zinc-400">
          Analyzing your reel... {progress}%
        </p>
      </div>

      {/* Info text */}
      <p className="text-center text-zinc-500 text-sm sm:text-base max-w-md px-4">
        This usually takes 15-30 seconds. Please don&#39;t close this window.
      </p>

      {/* Spinner for smaller screens */}
      <div className="md:hidden mt-4">
        <Icons.spinner className="h-8 w-8 animate-spin text-[#d87e36]" />
      </div>
    </div>
  );
};

export default Loader;
