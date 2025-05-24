import React from "react";
import { menuItems } from "./menu.items.config";
import SidebarMenuAccordionItem from "./SidebarMenuAccordionItem";
import SidebarMenuItem from "./SidebarMenuItem";

const SidebarMenu = () => {
  return (
    <div className="min-w-[200px]">
      {menuItems.map((item) =>
        item.children ? (
          <SidebarMenuAccordionItem
            icon={item.icon}
            title={item.title}
            key={item.title}
          >
            {item.children}
          </SidebarMenuAccordionItem>
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

export default SidebarMenu;
