import { useState } from "react";
import VideoCard from "../../components/ui/VideoCard";
import { VideoCardSkeleton } from "../../components/common/Skeleton";
import Button from "../../components/common/Button";
import useVideos from "../../hooks/useVideos";

const categories = [
  "All",
  "React",
  "Node.js",
  "MongoDB",
  "JavaScript",
  "CSS",
  "Python",
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const { videos, loading, error } = useVideos({
    query: activeCategory === "All" ? "" : activeCategory,
    sortBy: "createdAt",
  });

  return (
    <div>
      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={activeCategory === cat ? "primary" : "secondary"}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-20">
          <p className="text-[#aaaaaa] text-sm mb-4">{error}</p>
          <p className="text-[#717171] text-xs">
            Make sure your backend is running on port 8000
          </p>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array(12)
              .fill(0)
              .map((_, i) => <VideoCardSkeleton key={i} />)
          : videos.map((video) => <VideoCard key={video._id} video={video} />)}
      </div>

      {/* Empty State */}
      {!loading && !error && videos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-4xl mb-4">🎬</p>
          <p className="text-white font-medium text-lg">No videos found</p>
          <p className="text-[#aaaaaa] text-sm mt-2">
            Start your backend and upload some videos
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
