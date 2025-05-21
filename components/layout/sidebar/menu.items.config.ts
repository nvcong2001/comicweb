import { CakeSlice, Calendar, Camera, CandyOff } from "lucide-react";

type SidebarMenuItem = {
  title: string;
  icon: React.ElementType;
  href?: string;
  children?: [] | any[];
};

export const menuItems: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    icon: Camera,
    href: "/dashboard",
  },
  {
    title: "Danh  mục",
    icon: CakeSlice,
    children: [
      { title: "Loại nhà", icon: Calendar, href: "/dashboard/loainha" },
      { title: "Nhà", icon: CandyOff, href: "/dashboard/nha" },
    ],
  },
  {
    title: "Thống kê",
    icon: CakeSlice,
    children: [
      { title: "TK loai nha", icon: Calendar, href: "/dashboard/loainha" },
      { title: "TK nhà vip", icon: CandyOff, href: "/dashboard/nha" },
    ],
  },
];
