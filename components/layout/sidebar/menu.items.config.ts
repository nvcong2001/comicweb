import {
  BookA,
  BookText,
  BookType,
  BookUser,
  ChartPie,
  LibraryBig,
  ListCollapse,
} from "lucide-react";

type SidebarMenuItem = {
  title: string;
  icon: React.ElementType;
  href?: string;
  children?: [] | any[];
  isActive?: boolean;
};

export const menuItems: SidebarMenuItem[] = [
  { title: "Dashboard", icon: LibraryBig, href: "/dashboard" },
  {
    title: "Danh  mục",
    icon: ListCollapse,
    children: [
      { title: "Thể loại", icon: BookType, href: "/dashboard/categories" },
      { title: "Truyện", icon: BookText, href: "/dashboard/comics" },
      { title: "Người dùng", icon: BookUser, href: "/dashboard/users" },
      { title: "Tác giả", icon: BookA, href: "/dashboard/authors" },
    ],
  },
  {
    title: "Thống kê",
    icon: ChartPie,
    children: [
      { title: "TK loai nha", icon: BookType, href: "/dashboard/categories" },
      { title: "TK Truyện", icon: BookText, href: "/dashboard/comics" },
      { title: "TK Người dùng", icon: BookUser, href: "/dashboard/users" },
      { title: "TK Tác giả", icon: BookA, href: "/dashboard/authors" },
    ],
  },
];
