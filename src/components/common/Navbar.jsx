import { Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0f0f0f] flex items-center justify-between px-4 border-b border-[#2e2e2e]">
      {/* Left — Logo + Menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-full hover:bg-[#272727] transition-colors duration-150"
        >
          <HiMenuAlt1 className="text-white text-2xl" />
        </button>

        <Link to="/" className="flex items-center gap-1">
          <span className="text-white font-bold text-xl tracking-tight">
            Aether<span className="text-[#6c63ff]">Play</span>
          </span>
        </Link>
      </div>

      {/* Center — Search Bar */}
      <div className="flex items-center gap-2 w-full max-w-xl mx-6">
        <div className="flex flex-1 items-center bg-[#1a1a1a] border border-[#2e2e2e] rounded-full overflow-hidden focus-within:border-[#6c63ff] transition-colors duration-200">
          <input
            type="text"
            placeholder="Search videos..."
            className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-[#717171] outline-none"
          />
          <button className="px-4 py-2 bg-[#272727] hover:bg-[#3f3f3f] border-l border-[#2e2e2e] transition-colors duration-150">
            <IoSearchOutline className="text-white text-lg" />
          </button>
        </div>
      </div>

      {/* Right — Actions + Avatar */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-[#272727] transition-colors duration-150 hidden sm:flex">
          <RiVideoAddLine className="text-white text-xl" />
        </button>
        <button className="p-2 rounded-full hover:bg-[#272727] transition-colors duration-150 hidden sm:flex">
          <FiBell className="text-white text-xl" />
        </button>
        <Link to="/profile">
          <FaUserCircle className="text-[#aaaaaa] hover:text-white text-3xl transition-colors duration-150" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
