"use client";
import React, { useEffect, useState } from "react";
import DataTable, {
  Category,
} from "@/components/datatable/categories/DataTable";

const CategoriesDashboard = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      console.log(res);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setCategories(data.categories);
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Đang tải ...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRowsPerPage(value === "all" ? categories.length : Number(value));
    setCurrentPage(1);
  };

  // Tính toán các giá trị cho pagination
  const totalPages = Math.ceil(categories.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, categories.length);
  const currentData = categories.slice(startIndex, endIndex);
  // Tạo mảng các số trang để hiển thị
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <div>
        <h2 className="text-lg font-bold mb-4">THỂ LOẠI</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="">
          <input
            type="text"
            placeholder="Tìm kiếm thể loại..."
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="w-full flex gap-4">
          <button className="border p-2 rounded w-1/2">Add</button>
          <select
            className="border p-2 rounded w-1/2 text-center"
            onChange={handleRowsPerPageChange}
            value={rowsPerPage === categories.length ? "all" : rowsPerPage}
          >
            <option value="">Hiển thị</option>
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
      <DataTable data={currentData}></DataTable>

      {/* Pagination */}
      <div className="text-end mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Trước
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-3 py-1 border rounded ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default CategoriesDashboard;
