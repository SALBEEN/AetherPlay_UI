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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
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
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "56px",
        backgroundColor: "#0f0f0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #272727",
      }}
    >
      {/* Left */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          minWidth: "180px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onMenuClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "50%",
            color: "#f1f1f1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#272727")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <HiMenuAlt1 size={20} />
        </button>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span
            style={{
              color: "#f1f1f1",
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "-0.3px",
            }}
          >
            Aether<span style={{ color: "#ff0000" }}>Play</span>
          </span>
        </Link>
      </div>

      {/* Center */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flex: 1,
          maxWidth: "600px",
          margin: "0 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            border: `1px solid ${searchFocused ? "#1c62b9" : "#303030"}`,
            borderRadius: "40px",
            overflow: "hidden",
            backgroundColor: "#121212",
            boxShadow: searchFocused
              ? "inset 0 1px 2px rgba(0,0,0,0.3)"
              : "none",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              padding: "8px 16px",
              color: "#f1f1f1",
              fontSize: "16px",
            }}
          />
          <button
            style={{
              padding: "8px 20px",
              background: "#222222",
              border: "none",
              borderLeft: "1px solid #303030",
              cursor: "pointer",
              color: "#f1f1f1",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#3d3d3d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#222222")
            }
          >
            <IoSearchOutline size={20} />
          </button>
        </div>
        <button
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#222222",
            border: "none",
            cursor: "pointer",
            color: "#f1f1f1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#3d3d3d")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#222222")
          }
        >
          <IoMicOutline size={18} />
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flex: 1,
          maxWidth: "600px",
          margin: "0 16px",
          minWidth: 0,
        }}
      >
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            border: `1px solid ${searchFocused ? "#1c62b9" : "#303030"}`,
            borderRadius: "40px",
            overflow: "hidden",
            backgroundColor: "#121212",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              padding: "8px 16px",
              color: "#f1f1f1",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 20px",
              background: "#222222",
              border: "none",
              borderLeft: "1px solid #303030",
              cursor: "pointer",
              color: "#f1f1f1",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#3d3d3d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#222222")
            }
          >
            <IoSearchOutline size={20} />
          </button>
        </form>
        <button
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#222222",
            border: "none",
            cursor: "pointer",
            color: "#f1f1f1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#3d3d3d")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#222222")
          }
        >
          <IoMicOutline size={18} />
        </button>
      </div>

      {/* Right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          minWidth: "180px",
          justifyContent: "flex-end",
          flexShrink: 0,
        }}
      >
        {isAuthenticated ? (
          <>
            <Link to="/upload">
              <button
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#f1f1f1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#272727")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <RiVideoAddLine size={22} />
              </button>
            </Link>
            <button
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#f1f1f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#272727")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <FiBell size={22} />
            </button>

            <div style={{ position: "relative" }} ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                }}
              >
                <Avatar src={user?.avatar} alt={user?.username} size="sm" />
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "48px",
                    width: "220px",
                    backgroundColor: "#282828",
                    border: "1px solid #383838",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                    padding: "8px 0",
                    zIndex: 200,
                  }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid #383838",
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <Avatar src={user?.avatar} alt={user?.username} size="md" />
                    <div>
                      <p
                        style={{
                          color: "#f1f1f1",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {user?.fullName}
                      </p>
                      <p style={{ color: "#aaaaaa", fontSize: "12px" }}>
                        @{user?.username}
                      </p>
                    </div>
                  </div>
                  {[
                    { label: "Your channel", to: `/channel/${user?.username}` },
                    { label: "Your profile", to: "/profile" },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        display: "block",
                        padding: "10px 16px",
                        color: "#f1f1f1",
                        textDecoration: "none",
                        fontSize: "14px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#3d3d3d")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div
                    style={{
                      borderTop: "1px solid #383838",
                      marginTop: "8px",
                      paddingTop: "8px",
                    }}
                  >
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 16px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#f1f1f1",
                        fontSize: "14px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#3d3d3d")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              border: "1px solid #3d3d3d",
              borderRadius: "20px",
              color: "#3ea6ff",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
