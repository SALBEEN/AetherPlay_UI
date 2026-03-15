import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { format } from "timeago.js";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import useVideo from "../../hooks/useVideo";
import useVideos from "../../hooks/useVideos";
import Avatar from "../../components/ui/Avatar";
import LikeButton from "../../components/ui/LikeButton";
import SubscribeButton from "../../components/ui/SubscribeButton";
import VideoCard from "../../components/ui/VideoCard";
import Skeleton from "../../components/common/Skeleton";
import { VideoCardSkeleton } from "../../components/common/Skeleton";

const Watch = () => {
  const { videoId } = useParams();
  const { video, loading, error } = useVideo(videoId);
  const { videos: related, loading: relatedLoading } = useVideos({ limit: 10 });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[#aaaaaa]">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-[1600px]">
      {/* Left — Player + Info */}
      <div className="flex-1 min-w-0">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
          {loading ? (
            <Skeleton className="w-full h-full rounded-xl" />
          ) : (
            <ReactPlayer
              url={video?.videoFile}
              width="100%"
              height="100%"
              controls
              playing
              config={{
                file: { attributes: { controlsList: "nodownload" } },
              }}
            />
          )}
        </div>

        {/* Video Info */}
        <div className="mt-4">
          {loading ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ) : (
            <>
              {/* Title */}
              <h1 className="text-white font-semibold text-lg leading-snug">
                {video?.title}
              </h1>

              {/* Meta + Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
                <div className="flex items-center gap-2 text-[#aaaaaa] text-sm">
                  <AiOutlineEye className="text-base" />
                  <span>{video?.views?.toLocaleString()} views</span>
                  <span className="mx-1">•</span>
                  <span>{format(video?.createdAt)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <LikeButton
                    videoId={video?._id}
                    initialLikes={video?.likesCount || 0}
                    isLiked={video?.isLiked || false}
                  />
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] text-[#aaaaaa] hover:text-white text-sm transition-all duration-200">
                    <RiShareForwardLine className="text-lg" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] text-[#aaaaaa] hover:text-white text-sm transition-all duration-200">
                    <MdOutlinePlaylistAdd className="text-lg" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#2e2e2e] my-4" />

              {/* Channel Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Link to={`/channel/${video?.owner?._id}`}>
                    <Avatar
                      src={video?.owner?.avatar}
                      alt={video?.owner?.username}
                      size="lg"
                    />
                  </Link>
                  <div>
                    <Link to={`/channel/${video?.owner?._id}`}>
                      <p className="text-white font-medium hover:text-[#6c63ff] transition-colors duration-150">
                        {video?.owner?.username}
                      </p>
                    </Link>
                    <p className="text-[#aaaaaa] text-xs">
                      {video?.owner?.subscribersCount || 0} subscribers
                    </p>
                  </div>
                </div>
                <SubscribeButton
                  channelId={video?.owner?._id}
                  initialSubscribed={video?.isSubscribed || false}
                />
              </div>

              {/* Description */}
              {video?.description && (
                <div className="mt-4 bg-[#1a1a1a] rounded-xl p-4">
                  <p className="text-[#aaaaaa] text-sm leading-relaxed whitespace-pre-line">
                    {video.description}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right — Related Videos */}
      <div className="w-full lg:w-96 shrink-0">
        <h3 className="text-white font-medium mb-4">Related Videos</h3>
        <div className="flex flex-col gap-4">
          {relatedLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => <VideoCardSkeleton key={i} />)
            : related
                .filter((v) => v._id !== videoId)
                .map((v) => <VideoCard key={v._id} video={v} />)}
        </div>
      </div>
    </div>
  );
};

export default Watch;
