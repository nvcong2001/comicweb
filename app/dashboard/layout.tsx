"use client";
import SidebarMenu from "@/components/dashboard/sidebardashboard/SidebarMenu";
import Header from "@/components/dashboard/Header";
import React, { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpenSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative grid md:grid-cols-[20%_auto] md:grid-rows-[70px_auto] bg-neutral-800 text-neutral-200 font-bold h-auto min-h-screen overflow-y-auto">
      <div
        className={`md:fixed top-0 right-0 z-90 h-auto p-2 bg-neutral-800 row-start-1 transition-all duration-300 ${
          isOpen ? "left-1/5" : "left-0"
        }`}
      >
        <Header handleOpenSidebar={handleOpenSidebar} />
      </div>
      <div
        className={`md:row-start-2 p-2 md:col-span-2 w-full transition-all duration-300 ${
          isOpen ? "md:ml-[20%]  md:w-4/5" : ""
        }`}
      >
        <div className="bg-neutral-700 rounded p-2">{children}</div>
      </div>
      <div
        className={`md:fixed top-0 left-0 bottom-0 z-90 md:p-0 p-2 row-start-2 bg-neutral-800 transform transition-transform duration-300 ${
          isOpen ? "md:translate-x-0 md:w-1/5" : "md:-translate-x-full"
        }`}
      >
        <SidebarMenu isOpen={isOpen} />
      </div>
    </div>
  );
};

export default DashboardLayout;
