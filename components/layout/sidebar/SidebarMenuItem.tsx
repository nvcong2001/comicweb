import Link from "next/link";
import React from "react";

interface MenuItemProps {
  title: string;
  icon: React.ElementType;
  href: string;
}

const SidebarMenuItem = ({ title, icon: Icon, href }: MenuItemProps) => {
  return (
    <Link href={href} className="flex p-2 rounded hover:bg-stone-500">
      <Icon size={20} />
      <div className="ml-4">{title}</div>
    </Link>
  );
};

export default SidebarMenuItem;
