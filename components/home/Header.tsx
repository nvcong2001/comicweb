import { Bell, CircleUserRound, Search } from "lucide-react";

const Header = () => {
  return (
    <div className="grid grid-cols-[25%_50%_25%] text-white max-w-[1180px] mx-auto">
      <div className="w-30">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="relative mt-3">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="bg-white text-neutral-600 border border-blue-400 p-2 relative h-full outline-none w-[90%]"
        />
        <button className="bg-blue-400 text-white p-2 absolute">
          <Search />
        </button>
      </div>
      <div className="flex gap-2 justify-end items-center">
        <Bell />
        <CircleUserRound />
      </div>
    </div>
  );
};

export default Header;
