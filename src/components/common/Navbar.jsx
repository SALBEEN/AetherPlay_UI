import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { logoutUser } from "../../store/slices/authSlice";
import Avatar from "../ui/Avatar";
import toast from "react-hot-toast";

const Navbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
    setDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0f0f0f] flex items-center justify-between px-4 border-b border-[#2e2e2e]">
      {/* Left */}
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

      {/* Center — Search */}
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

      {/* Right */}
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <Link to="/upload">
              <button className="p-2 rounded-full hover:bg-[#272727] transition-colors duration-150 hidden sm:flex">
                <RiVideoAddLine className="text-white text-xl" />
              </button>
            </Link>
            <button className="p-2 rounded-full hover:bg-[#272727] transition-colors duration-150 hidden sm:flex">
              <FiBell className="text-white text-xl" />
            </button>

            {/* Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center"
              >
                <Avatar src={user?.avatar} alt={user?.username} size="sm" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-10 w-48 bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#2e2e2e]">
                    <p className="text-white text-sm font-medium">
                      {user?.username}
                    </p>
                    <p className="text-[#717171] text-xs">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-[#aaaaaa] hover:text-white hover:bg-[#272727] transition-colors"
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#272727] transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-1.5 border border-[#6c63ff] text-[#6c63ff] hover:bg-[#6c63ff] hover:text-white rounded-full text-sm transition-colors duration-200"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
