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
  "News",
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const { videos, loading, error } = useVideos({
    query: activeCategory === "All" ? "" : activeCategory,
    sortBy: "createdAt",
  });

  return (
    <div className="w-full">
      {/* Category Pills */}
      <div
        className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
              ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "bg-[#272727] text-[#f1f1f1] hover:bg-[#3f3f3f]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="flex flex-col items-center justify-center py-32 gap-3">
          <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center text-2xl">
            📡
          </div>
          <p className="text-white font-medium">Could not load videos</p>
          <p className="text-[#717171] text-sm">
            Make sure your backend is running
          </p>
        </div>
      )}

      {/* Grid */}
      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-8">
          {loading
            ? Array(12)
                .fill(0)
                .map((_, i) => <VideoCardSkeleton key={i} />)
            : videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && videos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center text-4xl">
            🎬
          </div>
          <div className="text-center">
            <p className="text-white font-semibold text-lg">No videos yet</p>
            <p className="text-[#717171] text-sm mt-1">
              Upload your first video to get started
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
