"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/datatable/DataTable";

interface Category {
  id: number;
  title: string;
}

const CategoriesDashboard = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <DataTable data={categories}></DataTable>
    </div>
  );
};

export default CategoriesDashboard;
