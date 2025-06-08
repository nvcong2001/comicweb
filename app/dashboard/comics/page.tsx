"use client";
import React from "react";
import DataTable from "@/components/datatable/DataTable";
import { columns, Comic } from "@/components/datatable/comics/Column";
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

const ComicsDashboard = () => {
  const pathname = "/comics";
  const schema = {
    title: { label: "Tên truyện", type: "text" },
    description: { label: "Mô tả", type: "text" },
    keywords: { label: "Từ khóa", type: "text" },
    status: {
      label: "Trạng thái",
      type: "dropdown",
      options: ["Đang ra", "Ngừng", "Nháp"],
    },
    price: { label: "Giá", type: "number" },
    image: { label: "Ảnh", type: "file" },
    userId: { label: "Người đăng", type: "number" },
    categoryIds: {
      label: "Thể loại",
      type: "dropdown",
      options: ["Huyền Huyễn"],
    },
  };
  const [query, updateQuery, resetQuery] = useQuery({
    page: 1,
    limit: 5,
  });

  const { data, extraInfo } = useFetchList(pathname, query);
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
        <h2 className="text-lg font-bold mb-4">TRUYỆN</h2>
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
            placeholder="Tìm kiếm truyện..."
            className="w-full border p-2 rounded"
          />
        </div>
        <Select onValueChange={(value) => handleRowsPerPageChange(value)}>
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

      <DataTable columns={columns} data={data}></DataTable>

      <Pagination
        currentPage={query.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ComicsDashboard;
