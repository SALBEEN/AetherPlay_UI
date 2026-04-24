import axiosInstance from "../api/axiosInstance";

export const authService = {
  register: async (data) => {
    const res = await axiosInstance.post("/users/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  login: async (data) => {
    const res = await axiosInstance.post("/users/login", {
      username: data.username,
      email: data.username,
      password: data.password,
    });
    return res.data; // this gives { statusCode, data: { user, accessToken, refreshToken }, message }
  },

  logout: async () => {
    const res = await axiosInstance.post("/users/logout");
    return res.data;
  },

  getCurrentUser: async () => {
    const res = await axiosInstance.get("/users/current-user");
    return res.data;
  },

  getCurrentUser: async () => {
    const res = await axiosInstance.get("/users/current-user");
    return res.data;
  },
};
