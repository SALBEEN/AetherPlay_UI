import { useState, useEffect } from "react";
import { videoService } from "../services/videoService";

const useVideo = (videoId) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId) return;

    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await videoService.getVideoById(videoId);
        setVideo(data?.data || null);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  return { video, loading, error, setVideo };
};

export default useVideo;
