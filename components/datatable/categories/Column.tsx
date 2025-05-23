"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Category = {
  id: string;
  title: string;
};

export const columns: ColumnDef<Category>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "title", header: "Tiêu đề" },
];
