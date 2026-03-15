import { Link } from "react-router-dom";
import { format } from "timeago.js";

const VideoCard = ({ video }) => {
  const {
    _id,
    title = "Untitled",
    thumbnail,
    views = 0,
    createdAt,
    owner,
    duration,
  } = video || {};

  const formatViews = (n) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n;
  };

  const formatDuration = (s) => {
    if (!s) return "";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0)
      return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        cursor: "pointer",
      }}
    >
      {/* Thumbnail */}
      <Link
        to={`/watch/${_id}`}
        style={{
          textDecoration: "none",
          display: "block",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            backgroundColor: "#272727",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#606060",
                fontSize: "13px",
              }}
            >
              No Thumbnail
            </div>
          )}
          {duration > 0 && (
            <span
              style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                backgroundColor: "rgba(0,0,0,0.85)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 700,
                padding: "2px 6px",
                borderRadius: "4px",
                letterSpacing: "0.3px",
              }}
            >
              {formatDuration(duration)}
            </span>
          )}
        </div>
      </Link>

      {/* Info Row */}
      {/* Info Row */}
      <div style={{ display: "flex", gap: "12px", padding: "0 4px" }}>
        {/* Channel Avatar — single image only */}
        <Link
          to={`/channel/${owner?.username}`}
          style={{ textDecoration: "none", flexShrink: 0 }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#3d3d3d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "2px",
            }}
          >
            {owner?.avatar ? (
              <img
                src={owner.avatar}
                alt={owner?.username}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <span
                style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}
              >
                {owner?.username?.charAt(0)?.toUpperCase() || "?"}
              </span>
            )}
          </div>
        </Link>

        {/* Text Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link to={`/watch/${_id}`} style={{ textDecoration: "none" }}>
            <h3
              style={{
                color: "#f1f1f1",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "20px",
                marginBottom: "4px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {title}
            </h3>
          </Link>
          <Link
            to={`/channel/${owner?.username}`}
            style={{ textDecoration: "none" }}
          >
            <p
              style={{
                color: "#aaaaaa",
                fontSize: "13px",
                marginBottom: "2px",
              }}
            >
              {owner?.username || "Unknown"}
            </p>
          </Link>
          <p style={{ color: "#aaaaaa", fontSize: "13px" }}>
            {formatViews(views)} views{createdAt && ` • ${format(createdAt)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
