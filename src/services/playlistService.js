import axiosInstance from "../api/axiosInstance";

export const playlistService = {
  createPlaylist: async (data) => {
    const res = await axiosInstance.post("/playlists", data);
    return res.data;
  },

  getUserPlaylists: async (userId) => {
    const res = await axiosInstance.get(`/playlists/user/${userId}`);
    return res.data;
  },

  getPlaylistById: async (playlistId) => {
    const res = await axiosInstance.get(`/playlists/${playlistId}`);
    return res.data;
  },

  addVideoToPlaylist: async (playlistId, videoId) => {
    const res = await axiosInstance.patch(
      `/playlists/add/${videoId}/${playlistId}`,
    );
    return res.data;
  },

  removeVideoFromPlaylist: async (playlistId, videoId) => {
    const res = await axiosInstance.patch(
      `/playlists/remove/${videoId}/${playlistId}`,
    );
    return res.data;
  },

  deletePlaylist: async (playlistId) => {
    const res = await axiosInstance.delete(`/playlists/${playlistId}`);
    return res.data;
  },

  updatePlaylist: async (playlistId, data) => {
    const res = await axiosInstance.patch(`/playlists/${playlistId}`, data);
    return res.data;
  },
};
