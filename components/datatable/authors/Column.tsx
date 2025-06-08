"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";

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
