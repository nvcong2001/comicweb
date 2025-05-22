import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SidebarMenuItem from "./SidebarMenuItem";

interface SidebarMenuAccordionItemProps {
  title: string;
  icon: React.ElementType;
  children: any[];
}

const SidebarMenuAccordionItem = ({
  title,
  icon: Icon,
  children,
}: SidebarMenuAccordionItemProps) => {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Icon size={20} /> {title}
          </AccordionTrigger>
          <AccordionContent>
            {/* Dung vong lap in cac menu item */}
            {children.map((menuItem) => (
              <SidebarMenuItem
                key={menuItem.title}
                title={menuItem.title}
                icon={menuItem.icon}
                href={menuItem.href}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SidebarMenuAccordionItem;
