import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Watch from "../pages/Watch/Watch";
import Channel from "../pages/Channel/Channel";
import Playlist from "../pages/Playlist/Playlist";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Layout Routes */}
      <Route
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
        path="/"
      />
      <Route
        element={
          <MainLayout>
            <Watch />
          </MainLayout>
        }
        path="/watch/:videoId"
      />
      <Route
        element={
          <MainLayout>
            <Channel />
          </MainLayout>
        }
        path="/channel/:channelId"
      />
      <Route
        element={
          <MainLayout>
            <Playlist />
          </MainLayout>
        }
        path="/playlist/:playlistId"
      />
      <Route
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
        path="/profile"
      />

      {/* Auth — no layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
