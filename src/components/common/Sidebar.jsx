import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import {
  MdOutlineSubscriptions,
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdVideoLibrary,
} from "react-icons/md";
import { BiHistory } from "react-icons/bi";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiVideoAddLine } from "react-icons/ri";

const navItems = [
  {
    icon: <AiOutlineHome size={20} />,
    activeIcon: <AiFillHome size={20} />,
    label: "Home",
    to: "/",
  },
  {
    icon: <MdOutlineSubscriptions size={20} />,
    activeIcon: <MdSubscriptions size={20} />,
    label: "Subscriptions",
    to: "/subscriptions",
  },
  {
    icon: <MdOutlineVideoLibrary size={20} />,
    activeIcon: <MdVideoLibrary size={20} />,
    label: "Library",
    to: "/library",
  },
  {
    icon: <BiHistory size={20} />,
    activeIcon: <BiHistory size={20} />,
    label: "History",
    to: "/history",
  },
  {
    icon: <BsBookmark size={20} />,
    activeIcon: <BsBookmarkFill size={20} />,
    label: "Playlists",
    to: "/playlist",
  },
  {
    icon: <RiVideoAddLine size={20} />,
    activeIcon: <RiVideoAddLine size={20} />,
    label: "Upload",
    to: "/upload",
  },
  {
    icon: <HiOutlineUser size={20} />,
    activeIcon: <HiUser size={20} />,
    label: "Profile",
    to: "/profile",
  },
];

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      style={{ width: isOpen ? "240px" : "72px" }}
      className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-[#0f0f0f] transition-all duration-300 z-40 overflow-y-auto overflow-x-hidden"
    >
      <nav className="flex flex-col py-3 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2.5 rounded-xl my-0.5 transition-all duration-200 group
              ${
                isActive
                  ? "bg-white/10 text-white font-medium"
                  : "text-[#aaaaaa] hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="shrink-0">
                  {isActive ? item.activeIcon : item.icon}
                </span>
                <span
                  style={{
                    opacity: isOpen ? 1 : 0,
                    width: isOpen ? "auto" : 0,
                  }}
                  className="text-sm whitespace-nowrap overflow-hidden transition-all duration-300"
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {isOpen && (
        <div className="px-4 mt-2 pt-4 border-t border-white/5">
          <p className="text-[#717171] text-xs font-medium uppercase tracking-wider mb-3">
            Explore
          </p>
          {["Trending", "Music", "Gaming", "News"].map((label) => (
            <button
              key={label}
              className="w-full text-left px-3 py-2 text-sm text-[#aaaaaa] hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
