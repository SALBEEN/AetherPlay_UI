import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./store/slices/authSlice";
import { fetchSubscriptions } from "./store/slices/subscriptionSlice";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      dispatch(fetchSubscriptions(user._id));
    }
  }, [isAuthenticated, user?._id, dispatch]);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#282828",
            color: "#f1f1f1",
            border: "1px solid #383838",
            fontSize: "14px",
            borderRadius: "12px",
          },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
