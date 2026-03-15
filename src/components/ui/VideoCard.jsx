import { Link } from "react-router-dom";
import { format } from "timeago.js";
import Avatar from "./Avatar";

const VideoCard = ({ video }) => {
  const {
    _id,
    title = "Untitled Video",
    thumbnail,
    views = 0,
    createdAt,
    owner,
    duration,
  } = video || {};

  const formatViews = (num) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num;
  };

  const formatDuration = (secs) => {
    if (!secs) return "";
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0)
      return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="group flex flex-col gap-3 w-full cursor-pointer">
      {/* Thumbnail */}
      <Link to={`/watch/${_id}`} className="relative block w-full">
        <div className="w-full aspect-video bg-[#1a1a1a] rounded-xl overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#444] text-xs">
              No Thumbnail
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

          {/* Duration */}
          {duration > 0 && (
            <span className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-1.5 py-0.5 rounded-md font-medium tracking-wide">
              {formatDuration(duration)}
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex gap-3 px-0.5">
        <Link to={`/channel/${owner?.username}`} className="shrink-0 mt-0.5">
          <Avatar src={owner?.avatar} alt={owner?.username} size="md" />
        </Link>

        <div className="flex-1 min-w-0">
          <Link to={`/watch/${_id}`}>
            <h3 className="text-[#f1f1f1] text-sm font-medium line-clamp-2 leading-snug hover:text-white transition-colors duration-150 mb-1">
              {title}
            </h3>
          </Link>
          <Link to={`/channel/${owner?.username}`}>
            <p className="text-[#aaaaaa] text-xs hover:text-white transition-colors duration-150 mb-0.5">
              {owner?.username || "Unknown Channel"}
            </p>
          </Link>
          <p className="text-[#717171] text-xs">
            {formatViews(views)} views
            {createdAt && ` • ${format(createdAt)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
