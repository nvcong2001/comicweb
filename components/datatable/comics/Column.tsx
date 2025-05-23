"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Comic = {
  id: string;
  title: string;
};

export const columns: ColumnDef<Comic>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "keywords", header: "Keywords" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "userId", header: "User ID" },
];
