import { CircleUserRound, List } from "lucide-react";
import React from "react";

const TopHeader = () => {
  return (
    <div className="flex justify-between bg-stone-700 rounded p-2">
      <button className="">
        <List />
      </button>
      <button className="">
        <CircleUserRound className="" />
      </button>
    </div>
  );
};

export default TopHeader;
