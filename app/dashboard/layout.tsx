import Footer from "@/components/Footer";
import RightPanel from "@/components/RightPanel";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="grid grid-cols-1 
    md:grid-cols-[auto_1fr_250px] 
    md:grid-rows-[100px_1fr_150px] 
    overflow-y-auto 
    bg-white text-black font-bold h-screen"
    >
      <div className="row-start-1 md:row-start-1 md:col-start-2 md:col-span-2 bg-gray-400">
        <TopHeader />
      </div>
      <div className="row-start-2 md:row-start-1 md:col-start-1 md:row-span-3 border border-r-black">
        <Sidebar />
      </div>
      <div className="">{children}</div>
      <div className="row-start-4 md:row-start-2 md:col-start-3 md:row-span-2 bg-fuchsia-400">
        <RightPanel />
      </div>
      <div className="row-start-5 md:row-start-3 md:col-start-2 bg-auto">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
