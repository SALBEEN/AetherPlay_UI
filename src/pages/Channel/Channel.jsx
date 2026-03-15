import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useChannel from "../../hooks/useChannel";
import VideoCard from "../../components/ui/VideoCard";
import { VideoCardSkeleton } from "../../components/common/Skeleton";
import SubscribeButton from "../../components/ui/SubscribeButton";
import Avatar from "../../components/ui/Avatar";
import Skeleton from "../../components/common/Skeleton";
import { MdOutlineVideoLibrary } from "react-icons/md";

const Channel = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { channel, videos, loading, error } = useChannel(channelId);

  const isOwner = user?._id === channel?._id || user?.username === channelId;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-[#aaaaaa]">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Cover Image */}
      <div className="w-full h-40 md:h-56 rounded-2xl overflow-hidden bg-[#1a1a1a] mb-6">
        {loading ? (
          <Skeleton className="w-full h-full rounded-2xl" />
        ) : channel?.coverImage ? (
          <img
            src={channel.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#6c63ff]/30 to-[#574fd6]/30" />
        )}
      </div>

      {/* Channel Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8 px-2">
        {/* Avatar */}
        {loading ? (
          <Skeleton className="w-20 h-20 rounded-full shrink-0" />
        ) : (
          <Avatar src={channel?.avatar} alt={channel?.username} size="xl" />
        )}

        {/* Details */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-64" />
            </div>
          ) : (
            <>
              <h1 className="text-white text-2xl font-bold">
                {channel?.fullName || channel?.username}
              </h1>
              <p className="text-[#aaaaaa] text-sm mt-0.5">
                @{channel?.username}
              </p>
              <div className="flex items-center gap-3 mt-1 text-[#aaaaaa] text-sm">
                <span>{channel?.subscribersCount || 0} subscribers</span>
                <span>•</span>
                <span>{videos.length} videos</span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        {!loading && (
          <div className="flex items-center gap-3 shrink-0">
            {isOwner ? (
              <button
                onClick={() => navigate("/profile")}
                className="px-5 py-2 rounded-full text-sm font-medium bg-[#272727] text-white hover:bg-[#3f3f3f] transition-colors duration-200"
              >
                Edit Channel
              </button>
            ) : (
              <SubscribeButton
                channelId={channel?._id}
                initialSubscribed={channel?.isSubscribed || false}
              />
            )}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[#2e2e2e] mb-8" />

      {/* Videos Section */}
      <div>
        <h2 className="text-white font-semibold text-lg mb-6">Videos</h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <VideoCardSkeleton key={i} />
              ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <MdOutlineVideoLibrary className="text-[#717171] text-5xl mb-4" />
            <p className="text-white font-medium">No videos yet</p>
            <p className="text-[#aaaaaa] text-sm mt-2">
              {isOwner
                ? "Upload your first video!"
                : "This channel has no videos yet"}
            </p>
            {isOwner && (
              <button
                onClick={() => navigate("/upload")}
                className="mt-4 px-5 py-2 bg-[#6c63ff] hover:bg-[#574fd6] text-white rounded-full text-sm transition-colors duration-200"
              >
                Upload Video
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
