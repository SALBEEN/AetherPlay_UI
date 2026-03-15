import { useState } from "react";
import VideoCard from "../../components/ui/VideoCard";
import { VideoCardSkeleton } from "../../components/common/Skeleton";
import useVideos from "../../hooks/useVideos";

const categories = [
  "All",
  "React",
  "Node.js",
  "MongoDB",
  "JavaScript",
  "CSS",
  "Python",
  "DevOps",
  "Gaming",
  "Music",
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const { videos, loading, error } = useVideos({
    query: activeCategory === "All" ? "" : activeCategory,
    sortBy: "createdAt",
  });

  return (
    <div style={{ padding: "50px 24px 24px" }}>
      {/* Category Bar */}
      <div
        style={{
          position: "sticky",
          top: "56px",
          zIndex: 80,
          backgroundColor: "#0f0f0f",
          borderBottom: "1px solid #272727",
          padding: "12px 24px",
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              flexShrink: 0,
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              backgroundColor: activeCategory === cat ? "#f1f1f1" : "#272727",
              color: activeCategory === cat ? "#0f0f0f" : "#f1f1f1",
              transition: "all 0.15s ease",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding: "24px 24px" }}>
        {error ? (
          <div style={{ textAlign: "center", paddingTop: "100px" }}>
            <p style={{ fontSize: "40px", marginBottom: "16px" }}>📡</p>
            <p style={{ color: "#f1f1f1", fontSize: "16px", fontWeight: 500 }}>
              Could not load videos
            </p>
            <p style={{ color: "#717171", fontSize: "14px", marginTop: "8px" }}>
              Make sure your backend is running
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
              gap: "16px 8px",
            }}
          >
            {loading
              ? Array(12)
                  .fill(0)
                  .map((_, i) => <VideoCardSkeleton key={i} />)
              : videos.map((v) => <VideoCard key={v._id} video={v} />)}
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: "100px" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>🎬</p>
            <p style={{ color: "#f1f1f1", fontSize: "18px", fontWeight: 600 }}>
              No videos yet
            </p>
            <p style={{ color: "#717171", fontSize: "14px", marginTop: "8px" }}>
              Upload your first video to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
