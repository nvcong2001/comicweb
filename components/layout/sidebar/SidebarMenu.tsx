import React from "react";
import { menuItems } from "./menu.items.config";
import SidebarMenuAccordionItem from "./SidebarMenuAccordionItem";
import SidebarMenuItem from "./SidebarMenuItem";

const Sidebar = () => {
  return (
    <div className="min-w-[200px] px-2">
      {menuItems.map((item) =>
        item.children ? (
          <SidebarMenuAccordionItem
            icon={item.icon}
            title={item.title}
            key={item.title}
            children={item.children}
          />
        ) : (
          <SidebarMenuItem
            icon={item.icon}
            title={item.title}
            key={item.title}
            href={item.href || ""}
          />
        )
      )}
    </div>
  );
};

export default Sidebar;
