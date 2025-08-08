import Link from "next/link";
import { Icons } from "@/components/icons";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between dark text-foreground bg-zinc-900 fixed z-50 w-full gap-3 p-4 sm:px-6 md:px-8 lg:px-12 shadow-sm border-b border-zinc-800">
      <Link
        href="/"
        className="flex items-center gap-1 hover:opacity-80 transition-opacity"
      >
        <p className="text-xl sm:text-2xl font-bold text-white leading-none">
          Real<span className="text-[#d87e36]">alyzer</span>
        </p>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="https://github.com/sandeepatel01/Reelalyzer"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#d87e36] hover:bg-[#8b5122] p-2 rounded transition-colors"
          aria-label="GitHub Repository"
        >
          <Icons.github className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
