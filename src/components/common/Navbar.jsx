import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoSearchOutline, IoMicOutline } from "react-icons/io5";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { logoutUser } from "../../store/slices/authSlice";
import Avatar from "../ui/Avatar";
import toast from "react-hot-toast";

const Navbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Signed out");
    navigate("/login");
    setDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0f0f0f]/95 backdrop-blur-md flex items-center justify-between px-4 border-b border-white/5">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 active:scale-95"
        >
          <HiMenuAlt1 className="text-white text-xl" />
        </button>
        <Link to="/" className="flex items-center gap-1.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#6c63ff] flex items-center justify-center shadow-lg shadow-[#6c63ff]/30 group-hover:shadow-[#6c63ff]/50 transition-all duration-300">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            Aether<span className="text-[#6c63ff]">Play</span>
          </span>
        </Link>
      </div>

      {/* Center — Search */}
      <div className="flex items-center gap-2 w-full max-w-2xl mx-4">
        <div
          className={`flex flex-1 items-center rounded-full overflow-hidden transition-all duration-300 ${
            searchFocused
              ? "bg-[#1a1a1a] border border-[#6c63ff] shadow-lg shadow-[#6c63ff]/10"
              : "bg-[#121212] border border-white/10 hover:border-white/20"
          }`}
        >
          <input
            type="text"
            placeholder="Search"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 bg-transparent px-5 py-2 text-sm text-white placeholder-[#717171] outline-none"
          />
          <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border-l border-white/10 transition-colors duration-150 flex items-center gap-2">
            <IoSearchOutline className="text-[#aaaaaa] text-lg" />
          </button>
        </div>
        <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200">
          <IoMicOutline className="text-white text-lg" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 min-w-[200px] justify-end">
        {isAuthenticated ? (
          <>
            <Link to="/upload">
              <button className="p-2.5 rounded-full hover:bg-white/10 transition-all duration-200 group hidden sm:flex">
                <RiVideoAddLine className="text-[#aaaaaa] group-hover:text-white text-xl transition-colors" />
              </button>
            </Link>
            <button className="p-2.5 rounded-full hover:bg-white/10 transition-all duration-200 group hidden sm:flex relative">
              <FiBell className="text-[#aaaaaa] group-hover:text-white text-xl transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#6c63ff] rounded-full border-2 border-[#0f0f0f]" />
            </button>

            {/* Avatar Dropdown */}
            <div className="relative ml-1" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                <Avatar src={user?.avatar} alt={user?.username} size="sm" />
                <span className="text-sm text-white font-medium hidden md:block">
                  {user?.username}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-56 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                    <Avatar src={user?.avatar} alt={user?.username} size="md" />
                    <div className="min-w-0">
                      <p className="text-white text-sm font-semibold truncate">
                        {user?.fullName}
                      </p>
                      <p className="text-[#717171] text-xs truncate">
                        @{user?.username}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#aaaaaa] hover:text-white hover:bg-white/5 transition-colors mx-1 rounded-xl mt-1"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to={`/channel/${user?.username}`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#aaaaaa] hover:text-white hover:bg-white/5 transition-colors mx-1 rounded-xl"
                  >
                    Your Channel
                  </Link>
                  <div className="border-t border-white/10 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors mx-1 rounded-xl"
                      style={{ width: "calc(100% - 8px)" }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-1.5 border border-[#3f3f3f] hover:border-[#6c63ff] text-white rounded-full text-sm transition-all duration-200 hover:bg-[#6c63ff]/10"
          >
            <span>Sign in</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
