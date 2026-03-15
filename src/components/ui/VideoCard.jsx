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

  const formatDuration = (seconds) => {
    if (!seconds) return "";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="group flex flex-col gap-3 cursor-pointer">
      {/* Thumbnail */}
      <Link to={`/watch/${_id}`} className="relative block">
        <div className="w-full aspect-video bg-[#272727] rounded-xl overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#717171]">
              No Thumbnail
            </div>
          )}
        </div>
        {/* Duration Badge */}
        {duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            {formatDuration(duration)}
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex gap-3">
        <Link to={`/channel/${owner?._id}`}>
          <Avatar src={owner?.avatar} alt={owner?.username} size="md" />
        </Link>

        <div className="flex-1 min-w-0">
          <Link to={`/watch/${_id}`}>
            <h3 className="text-white text-sm font-medium line-clamp-2 leading-snug hover:text-[#6c63ff] transition-colors duration-150">
              {title}
            </h3>
          </Link>
          <Link to={`/channel/${owner?.username}`}>
            <p className="text-[#aaaaaa] text-xs mt-1 hover:text-white transition-colors duration-150">
              {owner?.username || "Unknown Channel"}
            </p>
          </Link>
          <p className="text-[#717171] text-xs mt-0.5">
            {formatViews(views)} views
            {createdAt && ` • ${format(createdAt)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
