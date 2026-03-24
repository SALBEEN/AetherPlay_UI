import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { subscriptionService } from "../../services/subscriptionService";
import { videoService } from "../../services/videoService";
import VideoCard from "../../components/ui/VideoCard";
import { VideoCardSkeleton } from "../../components/common/Skeleton";

const Subscriptions = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videosLoading, setVideosLoading] = useState(true);
  const [activeChannel, setActiveChannel] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      fetchSubscriptions();
      fetchVideos();
    }
  }, [isAuthenticated, user]);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await subscriptionService.getUserSubscriptions(user._id);
      console.log("Subscriptions response:", res);

      const list =
        res?.data?.subscribedTo ||
        res?.data?.SubscribedTo ||
        res?.data?.channels ||
        res?.data ||
        [];

      // Extract channel info
      const channelList = Array.isArray(list)
        ? list.map((item) => item?.channel || item).filter(Boolean)
        : [];

      setChannels(channelList);
    } catch (err) {
      console.error("Subscription fetch error:", err);
      setChannels([]);
    } finally {
      setLoading(false);
    }
  };

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
    } catch (err) {
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
        <p
          style={{
            color: "#f1f1f1",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          Sign in to see your subscriptions
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

          {/* Channel avatars */}
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
                      animation: "pulse 1.5s infinite",
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
              No subscriptions yet — subscribe to channels to see them here
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
                {/* Avatar with active ring */}
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

                {/* Username */}
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

      {/* Videos Section */}
      <div style={{ padding: "24px" }}>
        {/* Section header */}
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

        {/* Error */}
        {error && (
          <div style={{ textAlign: "center", paddingTop: "40px" }}>
            <p style={{ color: "#aaaaaa", fontSize: "15px" }}>{error}</p>
          </div>
        )}

        {/* Video Grid */}
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

        {/* Empty state */}
        {!videosLoading && !error && filteredVideos.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: "80px" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>📺</p>
            <p style={{ color: "#f1f1f1", fontSize: "18px", fontWeight: 600 }}>
              {activeChannel === "all"
                ? "No videos from subscriptions"
                : `No videos from ${activeChannel}`}
            </p>
            <p
              style={{
                color: "#717171",
                fontSize: "14px",
                marginTop: "8px",
                marginBottom: "24px",
              }}
            >
              {activeChannel === "all"
                ? "Subscribe to channels to see their videos here"
                : "This channel has no videos yet"}
            </p>
            {activeChannel === "all" && (
              <Link
                to="/"
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
                Explore Videos
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
