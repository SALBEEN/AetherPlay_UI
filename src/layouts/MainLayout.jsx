import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Top Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex pt-14">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-60" : "ml-16"
          } p-6`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
