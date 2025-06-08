"use client";
import React from "react";
import DataTable from "@/components/datatable/DataTable";
import { columns } from "@/components/datatable/authors/Column";
import Pagination from "@/components/Pagination";
import useQuery from "@/app/hooks/useQuery";
import useFetchList from "@/app/hooks/useFetchData";
import ModalAddNew from "@/components/dashboard/ModalAddNew";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AuthorsDashboard = () => {
  const pathname = "/authors";
  const schema = {
    name: { label: "Tên tác giả", type: "text" },
    description: { label: "Mô tả", type: "text" },
    keywords: { label: "Từ khóa", type: "text" },
  };
  const [query, updateQuery, resetQuery] = useQuery({
    page: 1,
    limit: 5,
  });
  const { data, extraInfo } = useFetchList(pathname, query);
  const totalPages = extraInfo.totalPages || 1;
  const handlePageChange = (newpage: number) => {
    updateQuery({ page: newpage });
  };
  const handleRowsPerPageChange = (value: string) => {
    resetQuery();
    updateQuery({ limit: Number(value) });
  };

  return (
    <>
      <div className="flex justify-center">
        <h2 className="text-lg font-bold mb-4">TÁC GIẢ</h2>
      </div>
      <ModalAddNew
        query={query}
        updateQuery={updateQuery}
        pathname={pathname}
        schema={schema}
      />
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Tìm kiếm tác giả..."
            className="w-full border p-2 rounded"
          />
        </div>
        <Select
          onValueChange={(value) => handleRowsPerPageChange(value)}
          defaultValue={query.limit.toString()}
        >
          <SelectTrigger className="w-full col-start-4 py-5 rounded">
            <SelectValue placeholder="Select rows per page"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50, 100].map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <DataTable columns={columns} data={data}></DataTable>
      </div>

      <Pagination
        currentPage={query.page}
        totalPages={totalPages}
        onPageChange={(newpage) => handlePageChange(newpage)}
      />
    </>
  );
};

export default AuthorsDashboard;
