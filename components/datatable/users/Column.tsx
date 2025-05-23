"use client";

import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isDisabled: boolean;
};

export const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "password", header: "Password" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "createdAt", header: "Created At" },
  { accessorKey: "updatedAt", header: "Updated At" },
  { accessorKey: "isDisabled", header: "Is Disabled" },
];
