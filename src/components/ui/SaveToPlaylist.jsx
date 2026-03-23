import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { playlistService } from "../../services/playlistService";
import { MdOutlinePlaylistAdd, MdAdd, MdCheck } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SaveToPlaylist = ({ videoId }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open && isAuthenticated && user?._id) {
      fetchPlaylists();
    }
  }, [open]);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const res = await playlistService.getUserPlaylists(user._id);
      const list = res?.data?.playlists || res?.data || [];
      setPlaylists(Array.isArray(list) ? list : []);
    } catch {
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  };

  const isVideoInPlaylist = (playlist) => {
    // Backend uses "video" not "videos"
    const videoList = playlist?.video || playlist?.videos || [];
    return videoList.some(
      (v) =>
        v._id === videoId ||
        v === videoId ||
        v?.toString() === videoId?.toString(),
    );
  };

  const handleToggle = async (playlistId, isInPlaylist) => {
    try {
      setSaving(playlistId);
      if (isInPlaylist) {
        await playlistService.removeVideoFromPlaylist(playlistId, videoId);
        toast.success("Removed from playlist");
      } else {
        await playlistService.addVideoToPlaylist(playlistId, videoId);
        toast.success("Saved to playlist");
      }
      await fetchPlaylists();
    } catch {
      toast.error("Failed to update playlist");
    } finally {
      setSaving(null);
    }
  };

  const handleOpen = () => {
    if (!isAuthenticated) {
      toast.error("Please login to save videos");
      return;
    }
    setOpen((p) => !p);
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      {/* Save Button */}
      <button
        onClick={handleOpen}
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
          backgroundColor: open ? "#3d3d3d" : "#272727",
          color: "#f1f1f1",
          fontFamily: "Roboto, sans-serif",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#3d3d3d")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = open ? "#3d3d3d" : "#272727")
        }
      >
        <MdOutlinePlaylistAdd size={18} /> Save
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "44px",
            right: 0,
            width: "260px",
            backgroundColor: "#282828",
            border: "1px solid #383838",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            zIndex: 200,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #383838",
            }}
          >
            <p style={{ color: "#f1f1f1", fontSize: "14px", fontWeight: 600 }}>
              Save to playlist
            </p>
          </div>

          {/* Playlist List */}
          <div style={{ maxHeight: "240px", overflowY: "auto" }}>
            {loading ? (
              <div style={{ padding: "16px", textAlign: "center" }}>
                <p style={{ color: "#aaaaaa", fontSize: "13px" }}>Loading...</p>
              </div>
            ) : playlists.length === 0 ? (
              <div style={{ padding: "16px", textAlign: "center" }}>
                <p
                  style={{
                    color: "#aaaaaa",
                    fontSize: "13px",
                    marginBottom: "8px",
                  }}
                >
                  No playlists yet
                </p>
              </div>
            ) : (
              playlists.map((playlist) => {
                const inPlaylist = isVideoInPlaylist(playlist);
                const isSaving = saving === playlist._id;

                return (
                  <div
                    key={playlist._id}
                    onClick={() =>
                      !isSaving && handleToggle(playlist._id, inPlaylist)
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 16px",
                      cursor: isSaving ? "not-allowed" : "pointer",
                      transition: "background-color 0.15s",
                      opacity: isSaving ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#3d3d3d")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    {/* Checkbox */}
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "4px",
                        border: "2px solid",
                        borderColor: inPlaylist ? "#f1f1f1" : "#717171",
                        backgroundColor: inPlaylist ? "#f1f1f1" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.15s",
                      }}
                    >
                      {inPlaylist && <MdCheck size={14} color="#0f0f0f" />}
                    </div>

                    {/* Name */}
                    <p
                      style={{
                        color: "#f1f1f1",
                        fontSize: "14px",
                        flex: 1,
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {playlist.name}
                    </p>

                    {/* Video count */}
                    <p
                      style={{
                        color: "#717171",
                        fontSize: "12px",
                        flexShrink: 0,
                      }}
                    >
                      {playlist?.video?.length || playlist?.videos?.length || 0}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Create New */}
          <div style={{ borderTop: "1px solid #383838" }}>
            <Link
              to="/library"
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                textDecoration: "none",
                color: "#f1f1f1",
                fontSize: "14px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3d3d3d")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <MdAdd size={18} color="#aaaaaa" />
              Create new playlist
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveToPlaylist;
