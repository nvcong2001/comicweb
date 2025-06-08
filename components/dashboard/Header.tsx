import { CircleUserRound, List } from "lucide-react";
import React from "react";

const TopHeader = ({
  handleOpenSidebar,
}: {
  handleOpenSidebar: () => void;
}) => {
  return (
    <div className="flex justify-between bg-neutral-700 rounded p-2">
      <button className="">
        <List onClick={handleOpenSidebar} />
      </button>
      <button className="">
        <CircleUserRound className="" />
      </button>
    </div>
  );
};

export default TopHeader;
