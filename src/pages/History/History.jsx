import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromHistory,
  clearHistory,
} from "../../store/slices/historySlice";
import { format } from "timeago.js";
import { BiHistory } from "react-icons/bi";
import { MdDeleteOutline, MdDelete } from "react-icons/md";
import { BsPlayFill } from "react-icons/bs";
import toast from "react-hot-toast";

const History = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { videos, progress } = useSelector((state) => state.history);

  const formatDuration = (s) => {
    if (!s) return "";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0)
      return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const getProgressPercent = (videoId, duration) => {
    const saved = progress[videoId];
    if (!saved || !duration) return 0;
    return Math.min((saved / duration) * 100, 100);
  };

  const handleRemove = (videoId) => {
    dispatch(removeFromHistory(videoId));
    toast.success("Removed from history");
  };

  const handleClear = () => {
    dispatch(clearHistory());
    toast.success("History cleared");
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", paddingTop: "120px" }}>
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</p>
        <p style={{ color: "#f1f1f1", fontSize: "18px", fontWeight: 600 }}>
          Sign in to see your watch history
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
    <div style={{ padding: "24px", maxWidth: "1200px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <BiHistory size={26} color="#f1f1f1" />
          <h1 style={{ color: "#f1f1f1", fontSize: "20px", fontWeight: 600 }}>
            Watch History
          </h1>
          {videos.length > 0 && (
            <span
              style={{
                backgroundColor: "#272727",
                color: "#aaaaaa",
                fontSize: "12px",
                padding: "2px 10px",
                borderRadius: "20px",
                fontWeight: 500,
              }}
            >
              {videos.length}
            </span>
          )}
        </div>

        {videos.length > 0 && (
          <button
            onClick={handleClear}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              backgroundColor: "#272727",
              color: "#ff4444",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "Roboto, sans-serif",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#3d3d3d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#272727")
            }
          >
            <MdDelete size={16} /> Clear All
          </button>
        )}
      </div>

      {/* Empty state */}
      {videos.length === 0 && (
        <div style={{ textAlign: "center", paddingTop: "80px" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>📺</p>
          <p style={{ color: "#f1f1f1", fontSize: "18px", fontWeight: 600 }}>
            No watch history yet
          </p>
          <p
            style={{
              color: "#717171",
              fontSize: "14px",
              marginTop: "8px",
              marginBottom: "24px",
            }}
          >
            Videos you watch will appear here
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
            Browse Videos
          </Link>
        </div>
      )}

      {/* History List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {videos.map((video, index) => {
          const progressPct = getProgressPercent(video._id, video.duration);
          const savedSecs = progress[video._id];

          return (
            <div
              key={`${video._id}-${index}`}
              style={{
                display: "flex",
                gap: "16px",
                padding: "12px",
                borderRadius: "12px",
                transition: "background-color 0.15s",
                position: "relative",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1a1a1a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              {/* Thumbnail */}
              <Link
                to={`/watch/${video._id}`}
                style={{
                  flexShrink: 0,
                  width: "200px",
                  aspectRatio: "16/9",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "#272727",
                  display: "block",
                  position: "relative",
                }}
              >
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#272727",
                    }}
                  />
                )}

                {/* Duration badge */}
                {video.duration > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "6px",
                      right: "6px",
                      backgroundColor: "rgba(0,0,0,0.85)",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "2px 5px",
                      borderRadius: "4px",
                    }}
                  >
                    {formatDuration(video.duration)}
                  </span>
                )}

                {/* Progress bar */}
                {progressPct > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      backgroundColor: "rgba(255,255,255,0.3)",
                    }}
                  >
                    <div
                      style={{
                        width: `${progressPct}%`,
                        height: "100%",
                        backgroundColor: "#ff0000",
                      }}
                    />
                  </div>
                )}

                {/* Play overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BsPlayFill size={18} color="#0f0f0f" />
                  </div>
                </div>
              </Link>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0, paddingTop: "4px" }}>
                <Link
                  to={`/watch/${video._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h3
                    style={{
                      color: "#f1f1f1",
                      fontSize: "15px",
                      fontWeight: 500,
                      lineHeight: "22px",
                      marginBottom: "6px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {video.title}
                  </h3>
                </Link>

                <Link
                  to={`/channel/${video.owner?.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <p
                    style={{
                      color: "#aaaaaa",
                      fontSize: "13px",
                      marginBottom: "4px",
                    }}
                  >
                    {video.owner?.username}
                  </p>
                </Link>

                <p
                  style={{
                    color: "#717171",
                    fontSize: "12px",
                    marginBottom: "8px",
                  }}
                >
                  {video.views?.toLocaleString() || 0} views
                  {video.createdAt && ` • ${format(video.createdAt)}`}
                </p>

                {/* Resume info */}
                {savedSecs > 10 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "3px",
                        backgroundColor: "#3d3d3d",
                        borderRadius: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: `${progressPct}%`,
                          height: "100%",
                          backgroundColor: "#ff0000",
                          borderRadius: "2px",
                        }}
                      />
                    </div>
                    <span style={{ color: "#aaaaaa", fontSize: "11px" }}>
                      {formatDuration(savedSecs)} watched
                    </span>
                  </div>
                )}
              </div>

              {/* Remove button */}
              <button
                onClick={() => handleRemove(video._id)}
                title="Remove from history"
                style={{
                  alignSelf: "flex-start",
                  marginTop: "4px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#717171",
                  padding: "6px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#272727";
                  e.currentTarget.style.color = "#ff4444";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#717171";
                }}
              >
                <MdDeleteOutline size={20} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
