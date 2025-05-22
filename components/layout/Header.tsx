import { CircleUserRound, List } from "lucide-react";
import React from "react";

const TopHeader = () => {
  return (
    <div className="flex justify-between bg-gray-100 rounded">
      <button className="p-2">
        <List />
      </button>
      <button className="p-2">
        <CircleUserRound className="" />
      </button>
    </div>
  );
};

export default TopHeader;
