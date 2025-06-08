"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";

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
  {
    id: "actions",
    header: () => <div className="text-right">Hành động</div>,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="text-right">
          <button onClick={() => console.log("Edit", category.id)}>
            <Edit className="h-4 w-4" />
          </button>
          <button onClick={() => console.log("Delete", category.id)}>
            <Trash className="h-4 w-4" />
          </button>
        </div>
      );
    },
  },
];
