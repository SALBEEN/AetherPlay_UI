import { useState, useEffect } from "react";
import { videoService } from "../services/videoService";

const useVideos = (params = {}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await videoService.getAllVideos(params);

        // Handle AetherPlay API response shape
        const videoList = data?.data?.videos || data?.data || [];
        const total = data?.data?.totalVideos || videoList.length;

        setVideos(videoList);
        setHasMore(videoList.length < total);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [params.query, params.page, params.sortBy]);

  return { videos, loading, error, hasMore };
};

export default useVideos;
