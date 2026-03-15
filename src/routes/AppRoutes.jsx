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
import Upload from "../pages/Upload/Upload";
import Search from "../pages/Search/Search";

const WithLayout = ({ children }) => <MainLayout>{children}</MainLayout>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WithLayout>
            <Home />
          </WithLayout>
        }
      />
      <Route
        path="/search"
        element={
          <WithLayout>
            <Search />
          </WithLayout>
        }
      />
      <Route
        path="/watch/:videoId"
        element={
          <WithLayout>
            <Watch />
          </WithLayout>
        }
      />
      // Change this route
      <Route
        path="/channel/:channelId"
        element={
          <WithLayout>
            <Channel />
          </WithLayout>
        }
      />
      <Route
        path="/playlist/:playlistId"
        element={
          <WithLayout>
            <Playlist />
          </WithLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <WithLayout>
            <Profile />
          </WithLayout>
        }
      />
      {/* Placeholder routes — will be replaced in later steps */}
      <Route
        path="/subscriptions"
        element={
          <WithLayout>
            <Home />
          </WithLayout>
        }
      />
      <Route
        path="/library"
        element={
          <WithLayout>
            <Home />
          </WithLayout>
        }
      />
      <Route
        path="/history"
        element={
          <WithLayout>
            <Home />
          </WithLayout>
        }
      />
      <Route
        path="/upload"
        element={
          <WithLayout>
            <Upload />
          </WithLayout>
        }
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
