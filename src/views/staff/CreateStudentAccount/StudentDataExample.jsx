import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function StudentDataExample() {
  const title = "Mẫu file dữ liệu Sinh viên";
  const fileName = "sinh-vien-example.xlsx";
  const head = ["Mssv", "Họ và tên", "Ngày sinh", "Lớp"];
  const body = [
    ["20161234", "Nguyễn Văn B", "20-10-2000", "CNTT1.02"],
    ["20161235", "Lý Thị C", "20-10-2000", "CNTT2.01"],
    ["20161236", "Lê Thị D", "20-10-2000", "CNTT2.01"],
    ["20161237", "Trần Văn E", "20-10-2000", "CNTT2.01"],
    ["20161238", "Đào Thị F", "20-10-2000", "CNTT2.01"],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
