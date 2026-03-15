import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineSubscriptions, MdOutlineVideoLibrary } from "react-icons/md";
import { RiVideoAddLine } from "react-icons/ri";
import { BiHistory } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { BsBookmark } from "react-icons/bs";

const navItems = [
  { icon: <AiOutlineHome size={22} />, label: "Home", to: "/" },
  {
    icon: <MdOutlineSubscriptions size={22} />,
    label: "Subscriptions",
    to: "/subscriptions",
  },
  {
    icon: <MdOutlineVideoLibrary size={22} />,
    label: "Library",
    to: "/library",
  },
  { icon: <BiHistory size={22} />, label: "History", to: "/history" },
  { icon: <BsBookmark size={22} />, label: "Playlists", to: "/playlist" },
  { icon: <RiVideoAddLine size={22} />, label: "Upload", to: "/upload" },
  { icon: <HiOutlineUser size={22} />, label: "Profile", to: "/profile" },
];

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-[#0f0f0f] border-r border-[#2e2e2e] transition-all duration-300 z-40 overflow-y-auto overflow-x-hidden
        ${isOpen ? "w-60" : "w-16"}`}
    >
      <nav className="flex flex-col py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 transition-colors duration-150 rounded-xl mx-2 my-0.5
              ${
                isActive
                  ? "bg-[#272727] text-white font-medium"
                  : "text-[#aaaaaa] hover:bg-[#1a1a1a] hover:text-white"
              }`
            }
          >
            <span className="shrink-0">{item.icon}</span>
            {isOpen && (
              <span className="text-sm whitespace-nowrap">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
