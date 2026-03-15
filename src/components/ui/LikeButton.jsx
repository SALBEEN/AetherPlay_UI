import { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { videoService } from "../../services/videoService";
import toast from "react-hot-toast";
import clsx from "clsx";

const LikeButton = ({ videoId, initialLikes = 0, isLiked = false }) => {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login to like videos");
      return;
    }
    try {
      setLoading(true);
      await videoService.toggleLike(videoId);
      setLiked((prev) => !prev);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch {
      toast.error("Failed to update like");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
        liked
          ? "bg-[#6c63ff] text-white"
          : "bg-[#272727] text-[#aaaaaa] hover:bg-[#3f3f3f] hover:text-white",
      )}
    >
      {liked ? (
        <AiFillLike className="text-lg" />
      ) : (
        <AiOutlineLike className="text-lg" />
      )}
      {likes > 0 && <span>{likes}</span>}
      <span>Like</span>
    </button>
  );
};

export default LikeButton;
