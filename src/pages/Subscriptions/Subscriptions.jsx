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
  const [error, setError] = useState(null);
  const [activeChannel, setActiveChannel] = useState("all");

  useEffect(() => {
    if (isAuthenticated) fetchSubscriptions();
  }, [isAuthenticated]);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get subscribed channels
      const subRes = await subscriptionService.getUserSubscriptions(user?._id);
      const channelList =
        subRes?.data?.subscribedTo ||
        subRes?.data?.channels ||
        subRes?.data ||
        [];

      setChannels(Array.isArray(channelList) ? channelList : []);

      // Get all videos
      const videoRes = await videoService.getAllVideos({ limit: 50 });
      const videoList =
        videoRes?.data?.videos ||
        videoRes?.data?.videosList ||
        videoRes?.data ||
        [];

      setVideos(Array.isArray(videoList) ? videoList : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos =
    activeChannel === "all"
      ? videos
      : videos.filter((v) => v.owner?.username === activeChannel);

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
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <h1
        style={{
          color: "#f1f1f1",
          fontSize: "20px",
          fontWeight: 600,
          marginBottom: "24px",
        }}
      >
        Subscriptions
      </h1>

      {/* Channel Filter Pills */}
      {channels.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            marginBottom: "24px",
            paddingBottom: "8px",
            scrollbarWidth: "none",
          }}
        >
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
            }}
          >
            All
          </button>
          {channels.map((channel) => {
            const ch = channel?.channel || channel;
            return (
              <button
                key={ch?._id}
                onClick={() => setActiveChannel(ch?.username)}
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "20px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Roboto, sans-serif",
                  backgroundColor:
                    activeChannel === ch?.username ? "#f1f1f1" : "#272727",
                  color: activeChannel === ch?.username ? "#0f0f0f" : "#f1f1f1",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "#3d3d3d",
                    flexShrink: 0,
                  }}
                >
                  {ch?.avatar ? (
                    <img
                      src={ch.avatar}
                      alt={ch.username}
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
                        fontSize: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      {ch?.username?.charAt(0)?.toUpperCase()}
                    </span>
                  )}
                </div>
                {ch?.username}
              </button>
            );
          })}
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ textAlign: "center", paddingTop: "60px" }}>
          <p style={{ color: "#aaaaaa", fontSize: "15px" }}>{error}</p>
        </div>
      )}

      {/* Videos Grid */}
      {!error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px 12px",
          }}
        >
          {loading
            ? Array(8)
                .fill(0)
                .map((_, i) => <VideoCardSkeleton key={i} />)
            : filteredVideos.map((v) => <VideoCard key={v._id} video={v} />)}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filteredVideos.length === 0 && (
        <div style={{ textAlign: "center", paddingTop: "80px" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>📺</p>
          <p style={{ color: "#f1f1f1", fontSize: "18px", fontWeight: 600 }}>
            No videos from subscriptions
          </p>
          <p
            style={{
              color: "#717171",
              fontSize: "14px",
              marginTop: "8px",
              marginBottom: "24px",
            }}
          >
            Subscribe to channels to see their videos here
          </p>
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
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
