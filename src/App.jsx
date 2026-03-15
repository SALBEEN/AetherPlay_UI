import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#f1f1f1",
            border: "1px solid #2e2e2e",
          },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
