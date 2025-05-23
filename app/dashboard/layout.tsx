import Footer from "@/components/layout/Footer";
import RightPanel from "@/components/layout/RightPanel";
import SidebarMenu from "@/components/layout/sidebar/SidebarMenu";
import Header from "@/components/layout/Header";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_250px] md:grid-rows-[auto_1fr_150px] overflow-y-auto bg-stone-800 text-stone-200 font-bold h-screen">
      <div className="p-3 row-start-1 md:row-start-1 md:col-start-2 md:col-span-2">
        <Header />
      </div>
      <div className="p-3 md:mr-2 row-start-2 md:row-start-1 md:col-start-1 md:row-span-3 bg-stone-700">
        <SidebarMenu />
      </div>
      <div className="p-3">
        <div className="bg-stone-700 rounded p-2 h-full">{children}</div>
      </div>
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
