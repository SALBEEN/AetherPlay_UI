import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { videoService } from "../../services/videoService";
import VideoCard from "../../components/ui/VideoCard";
import { VideoCardSkeleton } from "../../components/common/Skeleton";

const Subscriptions = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { channels, loading } = useSelector((state) => state.subscriptions);
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [activeChannel, setActiveChannel] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setVideosLoading(true);
      const res = await videoService.getAllVideos({
        limit: 50,
        sortBy: "createdAt",
      });
      const list =
        res?.data?.videos || res?.data?.videosList || res?.data || [];
      setVideos(Array.isArray(list) ? list : []);
    } catch {
      setError("Failed to load videos");
    } finally {
      setVideosLoading(false);
    }
  };

  const filteredVideos =
    activeChannel === "all"
      ? videos
      : videos.filter(
          (v) =>
            v.owner?.username === activeChannel ||
            v.owner?._id === activeChannel,
        );

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", paddingTop: "120px" }}>
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</p>
        <p style={{ color: "#f1f1f1", fontSize: "18px", fontWeight: 600 }}>
          Sign in to see subscriptions
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
    <div style={{ padding: "0" }}>
      {/* Subscribed Channels Row */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid #272727",
          backgroundColor: "#0f0f0f",
          position: "sticky",
          top: "56px",
          zIndex: 70,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            scrollbarWidth: "none",
            alignItems: "center",
          }}
        >
          {/* All button */}
          <button
            onClick={() => setActiveChannel("all")}
            style={{
              flexShrink: 0,
              padding: "6px 16px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "Roboto, sans-serif",
              backgroundColor: activeChannel === "all" ? "#f1f1f1" : "#272727",
              color: activeChannel === "all" ? "#0f0f0f" : "#f1f1f1",
              transition: "all 0.15s",
            }}
          >
            All
          </button>

          {/* Channel avatars — from Redux */}
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    width: "80px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "#272727",
                    }}
                  />
                  <div
                    style={{
                      width: "60px",
                      height: "10px",
                      borderRadius: "4px",
                      backgroundColor: "#272727",
                    }}
                  />
                </div>
              ))
          ) : channels.length === 0 ? (
            <p style={{ color: "#717171", fontSize: "14px", padding: "8px 0" }}>
              No subscriptions yet
            </p>
          ) : (
            channels.map((channel) => (
              <div
                key={channel?._id}
                style={{
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  width: "80px",
                }}
                onClick={() =>
                  setActiveChannel(
                    activeChannel === channel?.username
                      ? "all"
                      : channel?.username,
                  )
                }
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "#3d3d3d",
                    border:
                      activeChannel === channel?.username
                        ? "2px solid #f1f1f1"
                        : "2px solid transparent",
                    transition: "border-color 0.15s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {channel?.avatar ? (
                    <img
                      src={channel.avatar}
                      alt={channel?.username}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: 700,
                      }}
                    >
                      {channel?.username?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  )}
                </div>
                <p
                  style={{
                    color:
                      activeChannel === channel?.username
                        ? "#f1f1f1"
                        : "#aaaaaa",
                    fontSize: "12px",
                    textAlign: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                    transition: "color 0.15s",
                  }}
                >
                  {channel?.username}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Videos */}
      <div style={{ padding: "24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "#f1f1f1", fontSize: "16px", fontWeight: 600 }}>
            {activeChannel === "all"
              ? "Latest videos"
              : `Videos from ${activeChannel}`}
          </h2>
          {activeChannel !== "all" && (
            <Link
              to={`/channel/${activeChannel}`}
              style={{
                color: "#3ea6ff",
                fontSize: "13px",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              View channel →
            </Link>
          )}
        </div>

        {error && (
          <p
            style={{
              color: "#aaaaaa",
              fontSize: "15px",
              textAlign: "center",
              paddingTop: "40px",
            }}
          >
            {error}
          </p>
        )}

        {!error && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px 12px",
            }}
          >
            {videosLoading
              ? Array(8)
                  .fill(0)
                  .map((_, i) => <VideoCardSkeleton key={i} />)
              : filteredVideos.map((v) => <VideoCard key={v._id} video={v} />)}
          </div>
        )}

        {!videosLoading && !error && filteredVideos.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: "80px" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>📺</p>
            <p style={{ color: "#f1f1f1", fontSize: "18px", fontWeight: 600 }}>
              {activeChannel === "all"
                ? "No videos yet"
                : `No videos from ${activeChannel}`}
            </p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                marginTop: "20px",
                padding: "10px 24px",
                backgroundColor: "#f1f1f1",
                color: "#0f0f0f",
                borderRadius: "20px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Explore Videos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
