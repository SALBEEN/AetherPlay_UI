import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./store/slices/authSlice";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) dispatch(fetchCurrentUser());
  }, [dispatch]);

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
