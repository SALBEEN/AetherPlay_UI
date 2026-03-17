import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import VideoCard from "../../components/ui/VideoCard";
import { VideoCardSkeleton } from "../../components/common/Skeleton";
import { BiHistory } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

const History = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) fetchHistory();
  }, [isAuthenticated]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get("/users/history");
      const list = res?.data?.data || [];
      setHistory(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      setHistory([]);
      toast.success("History cleared");
    } catch {
      toast.error("Failed to clear history");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", paddingTop: "120px" }}>
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</p>
        <p
          style={{
            color: "#f1f1f1",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          Sign in to see your watch history
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
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <BiHistory size={28} color="#f1f1f1" />
          <h1 style={{ color: "#f1f1f1", fontSize: "20px", fontWeight: 600 }}>
            Watch History
          </h1>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              backgroundColor: "#272727",
              color: "#f1f1f1",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "Roboto, sans-serif",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#3d3d3d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#272727")
            }
          >
            <MdDeleteOutline size={16} />
            Clear History
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{ textAlign: "center", paddingTop: "60px" }}>
          <p style={{ color: "#aaaaaa", fontSize: "15px" }}>{error}</p>
          <p style={{ color: "#717171", fontSize: "13px", marginTop: "8px" }}>
            Make sure your backend is running
          </p>
        </div>
      )}

      {/* History Grid */}
      {!error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px 12px",
          }}
        >
          {loading
            ? Array(8)
                .fill(0)
                .map((_, i) => <VideoCardSkeleton key={i} />)
            : history.map((video, i) => (
                <VideoCard key={`${video._id}-${i}`} video={video} />
              ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && history.length === 0 && (
        <div style={{ textAlign: "center", paddingTop: "80px" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>📺</p>
          <p style={{ color: "#f1f1f1", fontSize: "18px", fontWeight: 600 }}>
            No watch history yet
          </p>
          <p
            style={{
              color: "#717171",
              fontSize: "14px",
              marginTop: "8px",
              marginBottom: "24px",
            }}
          >
            Videos you watch will appear here
          </p>
          <Link
            to="/"
            style={{
              padding: "10px 24px",
              backgroundColor: "#f1f1f1",
              color: "#0f0f0f",
              borderRadius: "20px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            Browse Videos
          </Link>
        </div>
      )}
    </div>
  );
};

export default History;
