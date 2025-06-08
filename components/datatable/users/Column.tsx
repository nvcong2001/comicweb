"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  isDisabled: boolean;
};

export const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "password", header: "Password" },
  { accessorKey: "isDisabled", header: "Is Disabled" },
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
