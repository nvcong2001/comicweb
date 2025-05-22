import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Comic {
  id: number;
  title: string;
  description: string;
  image: string;
  keywords: string;
  status: string;
  price: number;
  userId: number;
}

const DataTable = ({ data }: { data: Comic[] }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chọn</TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Từ khóa</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Giá</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.keywords}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="text-right">{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default DataTable;
