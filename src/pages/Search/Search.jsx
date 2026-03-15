import { useSearchParams } from "react-router-dom";
import VideoCard from "../../components/ui/VideoCard";
import { VideoCardSkeleton } from "../../components/common/Skeleton";
import useVideos from "../../hooks/useVideos";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { videos, loading, error } = useVideos({ query });

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <p style={{ color: "#aaaaaa", fontSize: "14px", marginBottom: "24px" }}>
        {loading ? "Searching..." : `${videos.length} results for "${query}"`}
      </p>

      {/* Error */}
      {error && (
        <div style={{ textAlign: "center", paddingTop: "60px" }}>
          <p style={{ color: "#aaaaaa", fontSize: "15px" }}>{error}</p>
        </div>
      )}

      {/* Results Grid */}
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
            : videos.map((v) => <VideoCard key={v._id} video={v} />)}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && videos.length === 0 && (
        <div style={{ textAlign: "center", paddingTop: "80px" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</p>
          <p style={{ color: "#f1f1f1", fontSize: "18px", fontWeight: 600 }}>
            No results found for "{query}"
          </p>
          <p style={{ color: "#717171", fontSize: "14px", marginTop: "8px" }}>
            Try different keywords or check your spelling
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
