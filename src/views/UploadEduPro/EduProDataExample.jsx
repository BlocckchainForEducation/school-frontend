import React from "react";
import DownloadExampleData from "../../../../shared/DownloadExampleData";

export default function EduProDataExample() {
  const title = "Mẫu file dữ liệu CTĐT";
  const heads = ["Mã CTĐT", "Tên CTĐT", "Viện quản lý", "Số năm học", "Mã HP", "Tên HP", "Số TC", "Mô tả HP"];
  const rows = [
    ["HTTT-K61", "Kỹ sư HTTT", "Viện CNTT&TT", "5 năm", "IT1234", "Cơ sở dữ liệu", "3", "lorem ipsum..."],
    ["HTTT-K61", "Kỹ sư HTTT", "Viện CNTT&TT", "5 năm", "IT2235", "Kỹ thuật lập trình", "2", "lorem ipsum..."],
    ["KHMT-K61", "Kỹ sư KHMT", "Viện CNTT&TT", "5 năm", "IT3236", "Thiết kế giải thuật", "3", "lorem ipsum..."],
    ["KHMT-K61", "Kỹ sư KHMT", "Viện CNTT&TT", "5 năm", "IT4236", "Học máy", "2", "lorem ipsum..."],
  ];
  return <DownloadExampleData {...{ title, heads, rows }}></DownloadExampleData>;
}
