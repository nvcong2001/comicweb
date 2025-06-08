"use client";
import instance from "@/app/configs/axiosconfig";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ModalAddNew = ({
  query,
  updateQuery,
  pathname,
  schema,
}: {
  query: any;
  updateQuery: any;
  pathname: string;
  schema: any;
}) => {
  const initializeData = () => {
    const initialData: Record<string, string> = {};
    Object.keys(schema).forEach((key) => {
      initialData[key] = "";
    });
    return initialData;
  };

  useEffect(() => {
    setData(initializeData());
  }, [schema]);

  const [data, setData] = useState(initializeData());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = async () => {
    const processedData: Record<string, any> = {};

    Object.keys(schema).forEach((key) => {
      if (schema[key].required && (!data[key] || data[key].trim() === "")) {
        return;
      }

      if (schema[key].type === "number") {
        processedData[key] = data[key] ? Number(data[key]) : null;
      } else if (
        schema[key].type === "checkbox" ||
        schema[key].type === "radio"
      ) {
        processedData[key] = Boolean(data[key]);
      } else {
        processedData[key] = data[key];
      }
    });

    try {
      await axios.post(
        `${instance.defaults.baseURL}${pathname}`,
        processedData
      );
      setData(initializeData());
      updateQuery({ ...query });
    } catch (error) {
      alert("Không thể thêm " + pathname.slice(1) + " mới");
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      <Button
        variant="secondary"
        className="border rounded col-start-4 py-5"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <p className="text-wrap">Add new</p>
      </Button>

      <div
        className={`fixed inset-0 bg-black/60 flex z-99 justify-end transform transition-transform duration-200 ${
          isModalOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className="bg-neutral-700 p-6 md:w-2/3 w-4/5 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-2xl font-bold mb-4">
            {`Thêm ${pathname.slice(1)} mới`}
          </h3>
          {Object.keys(schema).map((key, index) => {
            return (
              <div key={index} className="mb-4">
                <label htmlFor={key} className="block text-sm mb-1">
                  {schema[key].label}:
                </label>
                {schema[key].type === "dropdown" ? (
                  <Select
                    onValueChange={(value) =>
                      setData({ ...data, [key]: value })
                    }
                    value={data[key]}
                  >
                    <SelectTrigger className="w-full py-2 rounded">
                      <SelectValue placeholder={`Chọn ${schema[key].label}`} />
                    </SelectTrigger>
                    <SelectContent className="z-99">
                      {schema[key].options.map((value: string) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={schema[key].type}
                    name={key}
                    value={data[key]}
                    onChange={(e) =>
                      setData({ ...data, [key]: e.target.value })
                    }
                    className="w-full p-2 border rounded bg-neutral-800 text-white"
                    placeholder={`Nhập ${schema[key].label}`}
                  />
                )}
              </div>
            );
          })}
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="px-4 py-2 border rounded"
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                handleAdd();
                setIsModalOpen(false);
              }}
              className="px-4 py-2 text-white rounded disabled:bg-blue-400"
            >
              Thêm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddNew;
