import axiosInstance from "../api/axiosInstance";

export const subscriptionService = {
  getSubscribedChannels: async () => {
    const res = await axiosInstance.get("/subscriptions/u/channels");
    return res.data;
  },

  getUserSubscriptions: async (userId) => {
    const res = await axiosInstance.get(`/subscriptions/u/${userId}`);
    return res.data;
  },

  toggleSubscription: async (channelId) => {
    const res = await axiosInstance.post(`/subscriptions/c/${channelId}`);
    return res.data;
  },
};
