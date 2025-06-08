"use client";
import React from "react";
import DataTable from "@/components/datatable/DataTable";
import { columns } from "@/components/datatable/users/Column";
import Pagination from "@/components/Pagination";
import useQuery from "@/app/hooks/useQuery";
import useFetchList from "@/app/hooks/useFetchData";

const UsersDashboard = () => {
  const [query, updateQuery, resetQuery] = useQuery({
    page: 1,
    limit: 5,
  });
  const { data, extraInfo } = useFetchList("/users", query);
  const totalPages = extraInfo.totalPages || 1;

  const handlePageChange = (page: number) => {
    updateQuery({ page: page });
  };
  const handleRowsPerPageChange = (value: string) => {
    resetQuery();
    updateQuery({ limit: Number(value) });
  };

  return (
    <div className="text-neutral-200">
      <div className="flex justify-center">
        <h2 className="text-lg font-bold mb-4">NGƯỜI DÙNG</h2>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <button className="border py-2 rounded col-start-4">Add</button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="col-start-4">
          <select
            className="border p-2 rounded w-full text-center"
            onChange={(e) => handleRowsPerPageChange(e.target.value)}
            value={query.limit.toString()}
          >
            {[5, 10, 20, 50, 100].map((value) => (
              <option key={value} className="text-black" value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <DataTable columns={columns} data={data}></DataTable>
      </div>

      <Pagination
        currentPage={query.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersDashboard;
