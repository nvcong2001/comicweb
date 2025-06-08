"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash, Edit } from "lucide-react";

export type Category = {
  id: string;
  title: string;
};

export const columns: ColumnDef<Category>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "title", header: "Tiêu đề" },
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
