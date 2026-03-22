import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { playlistService } from "../../services/playlistService";
import { MdOutlinePlaylistPlay, MdAdd } from "react-icons/md";
import { format } from "timeago.js";
import toast from "react-hot-toast";

const Library = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({ name: "", description: "" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?._id) fetchPlaylists();
  }, [isAuthenticated, user]);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const res = await playlistService.getUserPlaylists(user._id);
      const list = res?.data?.playlists || res?.data || [];
      setPlaylists(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to load playlists:", err);
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newPlaylist.name.trim()) {
      toast.error("Playlist name is required");
      return;
    }
    try {
      setCreating(true);
      const res = await playlistService.createPlaylist(newPlaylist);
      const created = res?.data?.playlist || res?.data;
      if (created) setPlaylists((prev) => [created, ...prev]);
      setNewPlaylist({ name: "", description: "" });
      setShowCreate(false);
      toast.success("Playlist created!");
    } catch {
      toast.error("Failed to create playlist");
    } finally {
      setCreating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", paddingTop: "120px" }}>
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</p>
        <p style={{ color: "#f1f1f1", fontSize: "18px", fontWeight: 600 }}>
          Sign in to view your library
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
    <div style={{ padding: "24px", maxWidth: "1400px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h1 style={{ color: "#f1f1f1", fontSize: "20px", fontWeight: 600 }}>
          Library
        </h1>
        <button
          onClick={() => setShowCreate((p) => !p)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 18px",
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
          <MdAdd size={18} /> New Playlist
        </button>
      </div>

      {/* Create Playlist Form */}
      {showCreate && (
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #272727",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "24px",
            maxWidth: "480px",
          }}
        >
          <h3
            style={{
              color: "#f1f1f1",
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            Create New Playlist
          </h3>
          <input
            type="text"
            placeholder="Playlist name *"
            value={newPlaylist.name}
            onChange={(e) =>
              setNewPlaylist((p) => ({ ...p, name: e.target.value }))
            }
            style={{
              width: "100%",
              backgroundColor: "#272727",
              border: "1px solid #3d3d3d",
              borderRadius: "8px",
              padding: "10px 14px",
              color: "#f1f1f1",
              fontSize: "14px",
              outline: "none",
              marginBottom: "12px",
              fontFamily: "Roboto, sans-serif",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#f1f1f1")}
            onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
          />
          <textarea
            placeholder="Description (optional)"
            value={newPlaylist.description}
            onChange={(e) =>
              setNewPlaylist((p) => ({ ...p, description: e.target.value }))
            }
            rows={3}
            style={{
              width: "100%",
              backgroundColor: "#272727",
              border: "1px solid #3d3d3d",
              borderRadius: "8px",
              padding: "10px 14px",
              color: "#f1f1f1",
              fontSize: "14px",
              outline: "none",
              resize: "none",
              marginBottom: "16px",
              fontFamily: "Roboto, sans-serif",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#f1f1f1")}
            onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleCreate}
              disabled={creating}
              style={{
                padding: "8px 20px",
                backgroundColor: "#f1f1f1",
                color: "#0f0f0f",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "Roboto, sans-serif",
                opacity: creating ? 0.7 : 1,
              }}
            >
              {creating ? "Creating..." : "Create"}
            </button>
            <button
              onClick={() => setShowCreate(false)}
              style={{
                padding: "8px 20px",
                backgroundColor: "#272727",
                color: "#f1f1f1",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Playlists Grid */}
      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                style={{
                  height: "200px",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "12px",
                  animation: "pulse 1.5s infinite",
                }}
              />
            ))}
        </div>
      ) : playlists.length === 0 ? (
        <div style={{ textAlign: "center", paddingTop: "80px" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>📋</p>
          <p style={{ color: "#f1f1f1", fontSize: "18px", fontWeight: 600 }}>
            No playlists yet
          </p>
          <p
            style={{
              color: "#717171",
              fontSize: "14px",
              marginTop: "8px",
              marginBottom: "24px",
            }}
          >
            Create your first playlist to organize your videos
          </p>
          <button
            onClick={() => setShowCreate(true)}
            style={{
              padding: "10px 24px",
              backgroundColor: "#f1f1f1",
              color: "#0f0f0f",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Create Playlist
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {playlists.map((playlist) => (
            <Link
              key={playlist._id}
              to={`/playlist/${playlist._id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#1a1a1a",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "background-color 0.15s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#272727")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1a1a1a")
                }
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    backgroundColor: "#272727",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {playlist?.videos?.[0]?.thumbnail ? (
                    <img
                      src={playlist.videos[0].thumbnail}
                      alt={playlist.name}
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MdOutlinePlaylistPlay size={40} color="#717171" />
                    </div>
                  )}
                  {/* Video count badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "rgba(0,0,0,0.8)",
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <MdOutlinePlaylistPlay size={14} color="#f1f1f1" />
                    <span
                      style={{
                        color: "#f1f1f1",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {playlist?.videos?.length || 0}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "12px" }}>
                  <p
                    style={{
                      color: "#f1f1f1",
                      fontSize: "14px",
                      fontWeight: 500,
                      marginBottom: "4px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {playlist.name}
                  </p>
                  <p style={{ color: "#717171", fontSize: "12px" }}>
                    {playlist?.createdAt ? format(playlist.createdAt) : ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
