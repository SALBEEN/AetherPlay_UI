import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f0f0f" }}>
      <Navbar onMenuClick={() => setSidebarOpen((p) => !p)} />
      <div style={{ display: "flex", paddingTop: "56px" }}>
        <Sidebar isOpen={sidebarOpen} />
        <main
          style={{
            marginLeft: sidebarOpen ? "240px" : "72px",
            flex: 1,
            minHeight: "calc(100vh - 56px)",
            transition: "margin-left 0.2s ease",
            overflowX: "hidden",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
