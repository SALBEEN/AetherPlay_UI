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

        // Handle all possible response shapes
        const videoList =
          data?.data?.videos ||
          data?.data?.videosList ||
          (Array.isArray(data?.data) ? data.data : []);

        const safeList = Array.isArray(videoList) ? videoList : [];
        const total = data?.data?.totalVideos || safeList.length;

        setVideos(safeList);
        setHasMore(safeList.length < total);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load videos");
        setVideos([]); // ← always set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [params.query, params.page, params.sortBy]);

  return { videos, loading, error, hasMore };
};

export default useVideos;
