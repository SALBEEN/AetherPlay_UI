import { useState, useEffect } from "react";
import { videoService } from "../services/videoService";

const useVideo = (videoId) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId) return;
    fetchVideo();
  }, [videoId]);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await videoService.getVideoById(videoId);
      console.log("Video API response:", data);

      // Handle all possible response shapes
      const videoData = data?.data?.video || data?.data || null;

      setVideo(videoData);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load video");
    } finally {
      setLoading(false);
    }
  };

  return { video, loading, error, setVideo };
};

export default useVideo;
