import axiosInstance from "../api/axiosInstance";

export const commentService = {
  getVideoComments: async (videoId, { page = 1, limit = 10 } = {}) => {
    const res = await axiosInstance.get(`/comments/${videoId}`, {
      params: { page, limit },
    });
    return res.data;
  },

  addComment: async (videoId, content) => {
    const res = await axiosInstance.post(`/comments/${videoId}`, { content });
    return res.data;
  },

  deleteComment: async (commentId) => {
    const res = await axiosInstance.delete(`/comments/c/${commentId}`);
    return res.data;
  },

  updateComment: async (commentId, content) => {
    const res = await axiosInstance.patch(`/comments/c/${commentId}`, {
      content,
    });
    return res.data;
  },
};
