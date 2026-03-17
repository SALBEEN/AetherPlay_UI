import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f0f0f" }}>
      <Navbar onMenuClick={() => setSidebarOpen((p) => !p)} />

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 80,
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        />
      )}

      <div style={{ display: "flex", paddingTop: "56px" }}>
        <Sidebar isOpen={sidebarOpen} isMobile={isMobile} />
        <main
          style={{
            marginLeft: isMobile ? "0" : sidebarOpen ? "240px" : "72px",
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
