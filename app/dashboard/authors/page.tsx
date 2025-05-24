"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/datatable/DataTable";
import { columns, Author } from "@/components/datatable/authors/Column";
import Pagination from "@/components/Pagination";

const AuthorsDashboard = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState<number | "all">(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAuthors = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/authors");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setAuthors(data.authors);
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAuthors();
  }, []);

  if (loading) {
    return <div>Đang tải ...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleRowsPerPageChange = (value: number | "all") => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };
  // Tính toán các giá trị cho pagination
  const totalPages =
    rowsPerPage === "all"
      ? 1
      : Math.ceil(authors.length / (rowsPerPage as number));
  const startIndex =
    rowsPerPage === "all" ? 0 : (currentPage - 1) * (rowsPerPage as number);
  const endIndex =
    rowsPerPage === "all"
      ? authors.length
      : Math.min(startIndex + (rowsPerPage as number), authors.length);
  const currentData = authors.slice(startIndex, endIndex);

  return (
    <div>
      <div>
        <h2 className="text-lg font-bold mb-4">TÁC GIẢ</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="">
          <input
            type="text"
            placeholder="Tìm kiếm tác giả..."
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="w-full flex gap-4">
          <button className="border p-2 rounded w-1/2">Add</button>
          <select
            className="border p-2 rounded w-1/2 text-center"
            onChange={(e) =>
              handleRowsPerPageChange(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
            value={
              rowsPerPage === authors.length ? "all" : rowsPerPage.toString()
            }
          >
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
      <DataTable columns={columns} data={currentData}></DataTable>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AuthorsDashboard;
