import Link from "next/link";
import React from "react";

const NavbarMenu = () => {
  return (
    <div className="bg-neutral-700 h-10 my-2">
      <div className="max-w-[1180px] mx-auto flex items-center py-2">
        <Link
          href="/home"
          className="hover:text-red-400 pr-2 items-center justify-center"
        >
          Trang chủ
        </Link>
        <Link
          href="/dashboard"
          className="hover:text-red-400 px-2 items-center justify-center"
        >
          Dashboard
        </Link>
        <Link
          href="/home/accounts"
          className="hover:text-red-400 px-2 items-center justify-center"
        >
          Tài khoản
        </Link>
      </div>
    </div>
  );
};

export default NavbarMenu;
