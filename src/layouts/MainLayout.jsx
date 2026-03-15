import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      <div className="flex pt-14">
        <Sidebar isOpen={sidebarOpen} />
        <main
          style={{ marginLeft: sidebarOpen ? "240px" : "72px" }}
          className="flex-1 transition-all duration-300 min-h-[calc(100vh-3.5rem)] overflow-x-hidden"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
