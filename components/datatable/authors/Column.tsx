"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Author = {
  id: number;
  name: string;
  description: string;
  keywords: string;
};

export const columns: ColumnDef<Author>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "keywords", header: "Keywords" },
];
