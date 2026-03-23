import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { playlistService } from "../../services/playlistService";
import VideoCard from "../../components/ui/VideoCard";
import { VideoCardSkeleton } from "../../components/common/Skeleton";
import { MdDeleteOutline, MdOutlinePlaylistPlay } from "react-icons/md";
import { BsPlayFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { format } from "timeago.js";

const Playlist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (playlistId) fetchPlaylist();
  }, [playlistId]);

  const fetchPlaylist = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await playlistService.getPlaylistById(playlistId);
      console.log("Playlist response:", res);
      // Backend returns data directly after our aggregation fix
      const data = res?.data || null;
      setPlaylist(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load playlist");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this playlist?")) return;
    try {
      await playlistService.deletePlaylist(playlistId);
      toast.success("Playlist deleted");
      navigate("/library");
    } catch {
      toast.error("Failed to delete playlist");
    }
  };

  const handleRemoveVideo = async (videoId) => {
    try {
      await playlistService.removeVideoFromPlaylist(playlistId, videoId);
      setPlaylist((prev) => ({
        ...prev,
        video: prev.video.filter((v) => v._id !== videoId),
      }));
      toast.success("Video removed from playlist");
    } catch {
      toast.error("Failed to remove video");
    }
  };

  // Use "video" field since that's what backend uses
  const videos = Array.isArray(playlist?.video) ? playlist.video : [];

  const isOwner =
    user?._id === playlist?.owner?._id || user?._id === playlist?.owner;

  if (error) {
    return (
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <p style={{ color: "#aaaaaa", fontSize: "16px" }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: "1400px" }}>
      {loading ? (
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          <div
            style={{
              width: "320px",
              height: "220px",
              backgroundColor: "#1a1a1a",
              borderRadius: "12px",
            }}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                height: "28px",
                width: "60%",
                backgroundColor: "#272727",
                borderRadius: "6px",
              }}
            />
            <div
              style={{
                height: "16px",
                width: "40%",
                backgroundColor: "#272727",
                borderRadius: "6px",
              }}
            />
            <div
              style={{
                height: "16px",
                width: "30%",
                backgroundColor: "#272727",
                borderRadius: "6px",
              }}
            />
          </div>
        </div>
      ) : (
        <>
          {/* Playlist Header */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              flexWrap: "wrap",
              marginBottom: "32px",
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                width: "320px",
                height: "180px",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#1a1a1a",
                flexShrink: 0,
                position: "relative",
              }}
            >
              {videos[0]?.thumbnail ? (
                <img
                  src={videos[0].thumbnail}
                  alt={playlist?.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <MdOutlinePlaylistPlay size={48} color="#717171" />
                  <p style={{ color: "#717171", fontSize: "13px" }}>
                    No videos
                  </p>
                </div>
              )}

              {/* Play all overlay */}
              {videos.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  onClick={() => navigate(`/watch/${videos[0]._id}`)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: "rgba(255,255,255,0.9)",
                      padding: "10px 20px",
                      borderRadius: "20px",
                    }}
                  >
                    <BsPlayFill size={18} color="#0f0f0f" />
                    <span
                      style={{
                        color: "#0f0f0f",
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    >
                      Play all
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1
                style={{
                  color: "#f1f1f1",
                  fontSize: "24px",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                {playlist?.name}
              </h1>

              {playlist?.description && (
                <p
                  style={{
                    color: "#aaaaaa",
                    fontSize: "14px",
                    lineHeight: "20px",
                    marginBottom: "12px",
                  }}
                >
                  {playlist.description}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px",
                }}
              >
                {playlist?.owner?.avatar && (
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      backgroundColor: "#3d3d3d",
                    }}
                  >
                    <img
                      src={playlist.owner.avatar}
                      alt={playlist.owner.username}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <p style={{ color: "#aaaaaa", fontSize: "13px" }}>
                  {playlist?.owner?.username}
                </p>
              </div>

              <p
                style={{
                  color: "#aaaaaa",
                  fontSize: "13px",
                  marginBottom: "4px",
                }}
              >
                {videos.length} video{videos.length !== 1 ? "s" : ""}
              </p>

              {playlist?.createdAt && (
                <p
                  style={{
                    color: "#717171",
                    fontSize: "13px",
                    marginBottom: "16px",
                  }}
                >
                  Created {format(playlist.createdAt)}
                </p>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {videos.length > 0 && (
                  <button
                    onClick={() => navigate(`/watch/${videos[0]._id}`)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 20px",
                      backgroundColor: "#f1f1f1",
                      color: "#0f0f0f",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "Roboto, sans-serif",
                    }}
                  >
                    <BsPlayFill size={16} /> Play All
                  </button>
                )}
                {isOwner && (
                  <button
                    onClick={handleDelete}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 20px",
                      backgroundColor: "#272727",
                      color: "#ff4444",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 500,
                      fontFamily: "Roboto, sans-serif",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#3d3d3d")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#272727")
                    }
                  >
                    <MdDeleteOutline size={16} /> Delete Playlist
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: "#272727",
              marginBottom: "24px",
            }}
          />

          {/* Videos */}
          {videos.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: "60px" }}>
              <p style={{ fontSize: "48px", marginBottom: "12px" }}>📋</p>
              <p
                style={{ color: "#f1f1f1", fontSize: "16px", fontWeight: 600 }}
              >
                This playlist is empty
              </p>
              <p
                style={{ color: "#717171", fontSize: "14px", marginTop: "8px" }}
              >
                Add videos from the watch page using the Save button
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "16px 12px",
              }}
            >
              {videos.map((video) => (
                <div key={video._id} style={{ position: "relative" }}>
                  <VideoCard video={video} />
                  {isOwner && (
                    <button
                      onClick={() => handleRemoveVideo(video._id)}
                      title="Remove from playlist"
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "rgba(0,0,0,0.8)",
                        border: "none",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        color: "#ff4444",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "0")
                      }
                    >
                      <MdDeleteOutline size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Playlist;
