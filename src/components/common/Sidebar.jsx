import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { MdOutlineSubscriptions, MdSubscriptions } from "react-icons/md";
import { BiHistory } from "react-icons/bi";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import {
  BsBookmark,
  BsBookmarkFill,
  BsCameraVideoFill,
  BsCameraVideo,
} from "react-icons/bs";
import { MdOutlineVideoLibrary, MdVideoLibrary } from "react-icons/md";

const navItems = [
  {
    icon: <AiOutlineHome size={22} />,
    activeIcon: <AiFillHome size={22} />,
    label: "Home",
    to: "/",
  },
  {
    icon: <MdOutlineSubscriptions size={22} />,
    activeIcon: <MdSubscriptions size={22} />,
    label: "Subscriptions",
    to: "/subscriptions",
  },
  {
    icon: <MdOutlineVideoLibrary size={22} />,
    activeIcon: <MdVideoLibrary size={22} />,
    label: "Library",
    to: "/library",
  },
  {
    icon: <BiHistory size={22} />,
    activeIcon: <BiHistory size={22} />,
    label: "History",
    to: "/history",
  },
  {
    icon: <BsBookmark size={22} />,
    activeIcon: <BsBookmarkFill size={22} />,
    label: "Playlists",
    to: "/playlist",
  },
  {
    icon: <BsCameraVideo size={22} />,
    activeIcon: <BsCameraVideoFill size={22} />,
    label: "Upload",
    to: "/upload",
  },
  {
    icon: <HiOutlineUser size={22} />,
    activeIcon: <HiUser size={22} />,
    label: "Profile",
    to: "/profile",
  },
];

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      style={{
        position: "fixed",
        top: "56px",
        left: 0,
        height: "calc(100vh - 56px)",
        width: isOpen ? "240px" : "72px",
        backgroundColor: "#0f0f0f",
        transition: "width 0.2s ease",
        zIndex: 90,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <nav style={{ padding: "12px 0" }}>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"}>
            {({ isActive }) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  padding: isOpen ? "10px 24px" : "16px 0",
                  justifyContent: isOpen ? "flex-start" : "center",
                  backgroundColor: isActive ? "#272727" : "transparent",
                  borderRadius: "10px",
                  margin: "0 8px 2px",
                  cursor: "pointer",
                  color: isActive ? "#f1f1f1" : "#aaaaaa",
                  textDecoration: "none",
                  transition: "background-color 0.1s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.backgroundColor = "#1a1a1a";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span style={{ flexShrink: 0 }}>
                  {isActive ? item.activeIcon : item.icon}
                </span>
                {isOpen && (
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: isActive ? 600 : 400,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            )}
          </NavLink>
        ))}

        {isOpen && (
          <>
            <div
              style={{
                height: "1px",
                backgroundColor: "#272727",
                margin: "12px 24px",
              }}
            />
            <p
              style={{
                padding: "4px 24px 8px",
                color: "#aaaaaa",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Explore
            </p>
            {["Trending", "Music", "Gaming", "News", "Sports"].map((label) => (
              <div
                key={label}
                style={{
                  padding: "10px 24px",
                  fontSize: "14px",
                  color: "#aaaaaa",
                  cursor: "pointer",
                  margin: "0 8px 2px",
                  borderRadius: "10px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1a1a1a")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {label}
              </div>
            ))}
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
