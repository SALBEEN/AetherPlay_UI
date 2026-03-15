import axiosInstance from "../api/axiosInstance";

export const videoService = {
  // Get all videos (feed)
  getAllVideos: async ({
    page = 1,
    limit = 12,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
  } = {}) => {
    const res = await axiosInstance.get("/videos", {
      params: { page, limit, query, sortBy, sortType },
    });
    return res.data;
  },

  // Get single video by ID
  getVideoById: async (videoId) => {
    const res = await axiosInstance.get(`/videos/${videoId}`);
    return res.data;
  },

  // Toggle like on a video
  toggleLike: async (videoId) => {
    const res = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
    return res.data;
  },

  // Get videos by channel
  getChannelVideos: async (channelId) => {
    const res = await axiosInstance.get(`/videos?userId=${channelId}`);
    return res.data;
  },

  // Upload video
  uploadVideo: async (formData) => {
    const res = await axiosInstance.post("/videos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // Delete video
  deleteVideo: async (videoId) => {
    const res = await axiosInstance.delete(`/videos/${videoId}`);
    return res.data;
  },

  // Add inside videoService object
  incrementView: async (videoId) => {
    const res = await axiosInstance.patch(`/videos/view/${videoId}`);
    return res.data;
  },
};
