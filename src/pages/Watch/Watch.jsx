import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { format } from "timeago.js";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import useVideo from "../../hooks/useVideo";
import useVideos from "../../hooks/useVideos";
import CommentSection from "../../components/ui/CommentSection";
import SubscribeButton from "../../components/ui/SubscribeButton";
import SaveToPlaylist from "../../components/ui/SaveToPlaylist";
import { VideoCardSkeleton } from "../../components/common/Skeleton";
import { videoService } from "../../services/videoService";
import { addToHistory, saveProgress } from "../../store/slices/historySlice";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";

const Watch = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const { video, loading, error } = useVideo(videoId);
  const { videos: related, loading: relatedLoading } = useVideos({ limit: 10 });
  const savedProgress = useSelector(
    (state) => state.history.progress[videoId] || 0,
  );

  const [liked, setLiked] = useState(false);
  const [likeDelta, setLikeDelta] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const videoRef = useRef(null);
  const progressSaveInterval = useRef(null);

  // Add to history + save backend
  useEffect(() => {
    if (videoId && localStorage.getItem("accessToken")) {
      axiosInstance.patch(`/users/history/${videoId}`).catch(() => {});
    }
  }, [videoId]);

  // Add video to Redux history when loaded
  useEffect(() => {
    if (video) {
      dispatch(addToHistory(video));
      setSubscriberCount(video?.owner?.subscribersCount || 0);
      setIsSubscribed(video?.isSubscribed || false);
    }
  }, [video, dispatch]);

  // Restore saved progress when video loads
  useEffect(() => {
    if (videoRef.current && savedProgress > 0) {
      videoRef.current.currentTime = savedProgress;
    }
  }, [savedProgress, video]);

  // Save progress every 5 seconds
  useEffect(() => {
    progressSaveInterval.current = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused) {
        dispatch(
          saveProgress({
            videoId,
            seconds: Math.floor(videoRef.current.currentTime),
          }),
        );
      }
    }, 5000);

    return () => clearInterval(progressSaveInterval.current);
  }, [videoId, dispatch]);

  // Save progress on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        dispatch(
          saveProgress({
            videoId,
            seconds: Math.floor(videoRef.current.currentTime),
          }),
        );
      }
    };
  }, [videoId, dispatch]);

  const handleLike = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login to like");
      return;
    }
    try {
      await videoService.toggleLike(videoId);
      setLiked((p) => !p);
      setLikeDelta((p) => (liked ? p - 1 : p + 1));
    } catch {
      toast.error("Failed to like");
    }
  };

  const formatViews = (n) => {
    if (!n) return "0";
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
  };

  if (error)
    return (
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <p style={{ color: "#aaaaaa", fontSize: "16px" }}>{error}</p>
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: window.innerWidth < 1024 ? "column" : "row",
        gap: "24px",
        padding: window.innerWidth < 768 ? "12px" : "24px 24px 40px",
        maxWidth: "1800px",
        alignItems: "flex-start",
      }}
    >
      {/* LEFT */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Resume banner */}
        {savedProgress > 60 && !loading && (
          <div
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #3d3d3d",
              borderRadius: "8px",
              padding: "10px 16px",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ color: "#aaaaaa", fontSize: "13px" }}>
              Resume from {Math.floor(savedProgress / 60)}:
              {String(Math.floor(savedProgress % 60)).padStart(2, "0")}
            </p>
            <button
              onClick={() => {
                if (videoRef.current)
                  videoRef.current.currentTime = savedProgress;
              }}
              style={{
                backgroundColor: "#f1f1f1",
                color: "#0f0f0f",
                border: "none",
                borderRadius: "20px",
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Resume
            </button>
          </div>
        )}

        {/* Video Player */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            backgroundColor: "#000",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "16px",
          }}
        >
          {loading ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#1a1a1a",
              }}
            />
          ) : video?.videoFile ? (
            <video
              ref={videoRef}
              src={video.videoFile}
              controls
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#000",
                display: "block",
              }}
              onError={(e) => console.error("Video error:", e)}
              onTimeUpdate={() => {
                if (videoRef.current) {
                  dispatch(
                    saveProgress({
                      videoId,
                      seconds: Math.floor(videoRef.current.currentTime),
                    }),
                  );
                }
              }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#aaaaaa",
                fontSize: "14px",
              }}
            >
              Video not available
            </div>
          )}
        </div>

        {/* Title */}
        {loading ? (
          <div
            style={{
              height: "24px",
              backgroundColor: "#272727",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          />
        ) : (
          <h1
            style={{
              color: "#f1f1f1",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "26px",
              marginBottom: "12px",
            }}
          >
            {video?.title}
          </h1>
        )}

        {/* Meta Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <p style={{ color: "#aaaaaa", fontSize: "14px" }}>
            {formatViews(video?.views)} views
            {video?.createdAt && ` • ${format(video.createdAt)}`}
          </p>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              onClick={handleLike}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
                backgroundColor: "#272727",
                color: liked ? "#3ea6ff" : "#f1f1f1",
                fontFamily: "Roboto, sans-serif",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3d3d3d")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#272727")
              }
            >
              {liked ? <AiFillLike size={18} /> : <AiOutlineLike size={18} />}
              {(video?.likesCount || 0) + likeDelta > 0
                ? formatViews((video?.likesCount || 0) + likeDelta)
                : "Like"}
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied!");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
                backgroundColor: "#272727",
                color: "#f1f1f1",
                fontFamily: "Roboto, sans-serif",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3d3d3d")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#272727")
              }
            >
              <RiShareForwardLine size={18} /> Share
            </button>

            <SaveToPlaylist videoId={videoId} />

            <button
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#272727",
                color: "#f1f1f1",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3d3d3d")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#272727")
              }
            >
              <BiDotsVerticalRounded size={20} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "#272727",
            marginBottom: "16px",
          }}
        />

        {/* Channel Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              to={`/channel/${video?.owner?.username}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: "#3d3d3d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {video?.owner?.avatar ? (
                  <img
                    src={video.owner.avatar}
                    alt={video.owner.username}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span
                    style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}
                  >
                    {video?.owner?.username?.charAt(0)?.toUpperCase()}
                  </span>
                )}
              </div>
            </Link>
            <div>
              <Link
                to={`/channel/${video?.owner?.username}`}
                style={{ textDecoration: "none" }}
              >
                <p
                  style={{
                    color: "#f1f1f1",
                    fontSize: "15px",
                    fontWeight: 500,
                    marginBottom: "2px",
                  }}
                >
                  {video?.owner?.username}
                </p>
              </Link>
              <p style={{ color: "#aaaaaa", fontSize: "13px" }}>
                {subscriberCount.toLocaleString()} subscriber
                {subscriberCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <SubscribeButton
            channelId={video?.owner?._id}
            initialSubscribed={isSubscribed}
            subscriberCount={subscriberCount}
            channel={video?.owner}
            onSubscribeChange={(newSubbed, newCount) => {
              setIsSubscribed(newSubbed);
              setSubscriberCount(newCount);
            }}
          />
        </div>

        {/* Description */}
        {video?.description && (
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                color: "#f1f1f1",
                fontSize: "14px",
                lineHeight: "22px",
                whiteSpace: "pre-line",
                display: showFullDesc ? "block" : "-webkit-box",
                WebkitLineClamp: showFullDesc ? "none" : 3,
                WebkitBoxOrient: "vertical",
                overflow: showFullDesc ? "visible" : "hidden",
              }}
            >
              {video.description}
            </p>
            <button
              onClick={() => setShowFullDesc((p) => !p)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#f1f1f1",
                fontSize: "14px",
                fontWeight: 600,
                padding: "8px 0 0",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              {showFullDesc ? "Show less" : "Show more"}
            </button>
          </div>
        )}

        <CommentSection videoId={videoId} />
      </div>

      {/* RIGHT — Related Videos */}
      <div style={{ width: "380px", flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {relatedLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => <VideoCardSkeleton key={i} />)
            : related
                .filter((v) => v._id !== videoId)
                .map((v) => (
                  <div
                    key={v._id}
                    style={{ display: "flex", gap: "8px", cursor: "pointer" }}
                  >
                    <Link
                      to={`/watch/${v._id}`}
                      style={{
                        flexShrink: 0,
                        width: "168px",
                        aspectRatio: "16/9",
                        borderRadius: "8px",
                        overflow: "hidden",
                        backgroundColor: "#272727",
                        display: "block",
                      }}
                    >
                      {v.thumbnail ? (
                        <img
                          src={v.thumbnail}
                          alt={v.title}
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
                    </Link>
                    <div style={{ flex: 1, minWidth: 0, paddingTop: "2px" }}>
                      <Link
                        to={`/watch/${v._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <p
                          style={{
                            color: "#f1f1f1",
                            fontSize: "13px",
                            fontWeight: 500,
                            lineHeight: "18px",
                            marginBottom: "4px",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {v.title}
                        </p>
                      </Link>
                      <Link
                        to={`/channel/${v.owner?.username}`}
                        style={{ textDecoration: "none" }}
                      >
                        <p
                          style={{
                            color: "#aaaaaa",
                            fontSize: "12px",
                            marginBottom: "2px",
                          }}
                        >
                          {v.owner?.username}
                        </p>
                      </Link>
                      <p style={{ color: "#aaaaaa", fontSize: "12px" }}>
                        {formatViews(v.views)} views
                      </p>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;
