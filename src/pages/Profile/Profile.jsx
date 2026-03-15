import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, fetchCurrentUser } from "../../store/slices/authSlice";
import useVideos from "../../hooks/useVideos";
import VideoCard from "../../components/ui/VideoCard";
import { VideoCardSkeleton } from "../../components/common/Skeleton";
import toast from "react-hot-toast";
import { RiVideoAddLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("videos");
  const { videos, loading } = useVideos({});

  useEffect(() => {
    if (!user && localStorage.getItem("accessToken")) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  const myVideos = videos.filter(
    (v) => v.owner?._id === user?._id || v.owner?.username === user?.username,
  );

  const totalViews = myVideos.reduce((acc, v) => acc + (v.views || 0), 0);

  const fmt = (n) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n;
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Signed out");
    navigate("/login");
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", paddingTop: "120px" }}>
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</p>
        <p
          style={{
            color: "#f1f1f1",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          Sign in to view your profile
        </p>
        <Link
          to="/login"
          style={{
            display: "inline-block",
            marginTop: "16px",
            padding: "10px 28px",
            backgroundColor: "#f1f1f1",
            color: "#0f0f0f",
            borderRadius: "20px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{ maxWidth: "1100px", margin: "0 auto", paddingBottom: "60px" }}
    >
      {/* Cover Banner */}
      <div
        style={{
          width: "100%",
          height: "160px",
          borderRadius: "12px",
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          position: "relative",
          overflow: "hidden",
          marginBottom: "60px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 50%, rgba(108,99,255,0.4) 0%, transparent 70%)",
          }}
        />

        {/* Avatar overlapping cover */}
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "24px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#3d3d3d",
            border: "4px solid #0f0f0f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ color: "#fff", fontSize: "28px", fontWeight: 700 }}>
              {user?.username?.charAt(0)?.toUpperCase() || "?"}
            </span>
          )}
        </div>
      </div>

      {/* Profile Info + Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          padding: "0 24px",
          marginBottom: "28px",
        }}
      >
        <div>
          <h1
            style={{
              color: "#f1f1f1",
              fontSize: "20px",
              fontWeight: 700,
              marginBottom: "2px",
            }}
          >
            {user?.fullName || user?.username || "User"}
          </h1>
          <p
            style={{ color: "#aaaaaa", fontSize: "14px", marginBottom: "2px" }}
          >
            @{user?.username}
          </p>
          <p style={{ color: "#717171", fontSize: "13px" }}>{user?.email}</p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link
            to="/upload"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 18px",
              backgroundColor: "#f1f1f1",
              color: "#0f0f0f",
              borderRadius: "20px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <RiVideoAddLine size={15} /> Upload
          </Link>
          <Link
            to={`/channel/${user?.username}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 18px",
              backgroundColor: "#272727",
              color: "#f1f1f1",
              borderRadius: "20px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            <HiOutlineUser size={15} /> Channel
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 18px",
              backgroundColor: "#272727",
              color: "#ff4444",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <BiLogOut size={15} /> Sign Out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          padding: "0 24px",
          marginBottom: "32px",
        }}
      >
        {[
          {
            icon: <RiVideoAddLine size={18} />,
            label: "Videos",
            value: myVideos.length,
          },
          {
            icon: <AiOutlineEye size={18} />,
            label: "Total Views",
            value: fmt(totalViews),
          },
          {
            icon: <MdOutlineSubscriptions size={18} />,
            label: "Subscribers",
            value: user?.subscribersCount || 0,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #272727",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div style={{ color: "#aaaaaa", marginBottom: "10px" }}>
              {stat.icon}
            </div>
            <p
              style={{
                color: "#f1f1f1",
                fontSize: "24px",
                fontWeight: 700,
                marginBottom: "4px",
              }}
            >
              {stat.value}
            </p>
            <p style={{ color: "#aaaaaa", fontSize: "13px" }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #272727",
          padding: "0 24px",
          marginBottom: "24px",
        }}
      >
        {["videos", "about"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "12px 24px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              color: activeTab === tab ? "#f1f1f1" : "#aaaaaa",
              borderBottom:
                activeTab === tab
                  ? "2px solid #f1f1f1"
                  : "2px solid transparent",
              textTransform: "capitalize",
              fontFamily: "Roboto, sans-serif",
              marginBottom: "-1px",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: "0 24px" }}>
        {/* Videos */}
        {activeTab === "videos" &&
          (loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                gap: "16px",
              }}
            >
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <VideoCardSkeleton key={i} />
                ))}
            </div>
          ) : myVideos.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: "60px" }}>
              <p style={{ fontSize: "48px", marginBottom: "12px" }}>🎬</p>
              <p
                style={{
                  color: "#f1f1f1",
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                No videos yet
              </p>
              <p
                style={{
                  color: "#717171",
                  fontSize: "14px",
                  marginBottom: "20px",
                }}
              >
                Share your first video with the world
              </p>
              <Link
                to="/upload"
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#f1f1f1",
                  color: "#0f0f0f",
                  borderRadius: "20px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Upload Video
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                gap: "16px",
              }}
            >
              {myVideos.map((v) => (
                <VideoCard key={v._id} video={v} />
              ))}
            </div>
          ))}

        {/* About */}
        {activeTab === "about" && (
          <div style={{ maxWidth: "500px" }}>
            <div
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #272727",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  color: "#f1f1f1",
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                Account Details
              </h3>
              {[
                { label: "Full Name", value: user?.fullName || "—" },
                { label: "Username", value: `@${user?.username}` },
                { label: "Email", value: user?.email },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom:
                      i < arr.length - 1 ? "1px solid #272727" : "none",
                  }}
                >
                  <span style={{ color: "#aaaaaa", fontSize: "14px" }}>
                    {item.label}
                  </span>
                  <span
                    style={{
                      color: "#f1f1f1",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
