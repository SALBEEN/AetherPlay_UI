import axiosInstance from "../api/axiosInstance";

export const channelService = {
  getChannelProfile: async (username) => {
    const res = await axiosInstance.get(`/users/c/${username}`);
    return res.data;
  },

  getChannelVideos: async (userId) => {
    const res = await axiosInstance.get(`/videos?userId=${userId}`);
    return res.data;
  },
};
