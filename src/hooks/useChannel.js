import { useState, useEffect } from "react";
import { channelService } from "../services/channelService";

const useChannel = (username) => {
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    fetchChannel();
  }, [username]);

  const fetchChannel = async () => {
    try {
      setLoading(true);
      setError(null);

      const channelRes = await channelService.getChannelProfile(username);
      const channelData =
        channelRes?.data?.channel?.[0] ||
        channelRes?.data?.channel ||
        channelRes?.data;
      setChannel(channelData);

      if (channelData?._id) {
        const videosRes = await channelService.getChannelVideos(
          channelData._id,
        );
        const videoList = videosRes?.data?.videos || videosRes?.data || [];
        setVideos(videoList);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load channel");
    } finally {
      setLoading(false);
    }
  };

  return { channel, videos, loading, error };
};

export default useChannel;
