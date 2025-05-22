import Footer from "@/components/layout/Footer";
import RightPanel from "@/components/layout/RightPanel";
import SidebarMenu from "@/components/layout/sidebar/SidebarMenu";
import Header from "@/components/layout/Header";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_250px] md:grid-rows-[auto_1fr_150px] overflow-y-auto bg-white text-black font-bold h-screen">
      <div className="p-3 row-start-1 md:row-start-1 md:col-start-2 md:col-span-2">
        <Header />
      </div>
      <div className="row-start-2 md:row-start-1 md:col-start-1 md:row-span-3 border border-r-black">
        <SidebarMenu />
      </div>
      <div className="p-3">{children}</div>
      <div className="p-3 row-start-4 md:row-start-2 md:col-start-3 md:row-span-2">
        <RightPanel />
      </div>
      <div className="p-3 row-start-5 md:row-start-3 md:col-start-2">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
