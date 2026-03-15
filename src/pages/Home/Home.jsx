import VideoCard from "../../components/ui/VideoCard";
import { VideoCardSkeleton } from "../../components/common/Skeleton";
import Button from "../../components/common/Button";

const mockVideo = {
  _id: "1",
  title: "Building a Full Stack MERN App with AetherPlay",
  views: 24500,
  createdAt: new Date(Date.now() - 3600000 * 5),
  duration: 754,
  owner: { username: "salbeen", _id: "u1" },
};

const Home = () => {
  return (
    <div>
      <div className="flex gap-3 mb-6 flex-wrap">
        <Button variant="primary" size="sm">
          All
        </Button>
        <Button variant="secondary" size="sm">
          React
        </Button>
        <Button variant="secondary" size="sm">
          Node.js
        </Button>
        <Button variant="secondary" size="sm">
          MongoDB
        </Button>
        <Button variant="secondary" size="sm">
          JavaScript
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Mock loaded card */}
        <VideoCard video={mockVideo} />
        {/* Skeleton placeholders */}
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
      </div>
    </div>
  );
};

export default Home;
