import React from "react";
import UploadHistoryWithTitle from "../../../../shared/UploadHistory/UploadHistoryWithTitle";

export default function EduProUploadHistory() {
  const histories = [
    {
      id: "#1 - ",
      time: "01/01/2020",
      heads: ["Mã CTĐT", "Tên CTĐT", "Viện quản lý", "Số năm học", "Mã HP", "Tên HP", "Số TC", "Mô tả HP"],
      rows: [
        ["HTTT-K61", "Kỹ sư HTTT", "Viện CNTT&TT", "5 năm", "IT1234", "Cơ sở dữ liệu", "3", "lorem ipsum..."],
        ["HTTT-K61", "Kỹ sư HTTT", "Viện CNTT&TT", "5 năm", "IT2235", "Kỹ thuật lập trình", "2", "lorem ipsum..."],
        ["KHMT-K61", "Kỹ sư KHMT", "Viện CNTT&TT", "5 năm", "IT3236", "Thiết kế giải thuật", "3", "lorem ipsum..."],
        ["KHMT-K61", "Kỹ sư KHMT", "Viện CNTT&TT", "5 năm", "IT4236", "Học máy", "2", "lorem ipsum..."],
      ],
    },
    {
      id: "#2 - ",
      time: "01/01/2020",
      heads: ["Mã CTĐT", "Tên CTĐT", "Viện quản lý", "Số năm học", "Mã HP", "Tên HP", "Số TC", "Mô tả HP"],
      rows: [
        ["HTTT-K61", "Kỹ sư HTTT", "Viện CNTT&TT", "5 năm", "IT1234", "Cơ sở dữ liệu", "3", "lorem ipsum..."],
        ["HTTT-K61", "Kỹ sư HTTT", "Viện CNTT&TT", "5 năm", "IT2235", "Kỹ thuật lập trình", "2", "lorem ipsum..."],
        ["KHMT-K61", "Kỹ sư KHMT", "Viện CNTT&TT", "5 năm", "IT3236", "Thiết kế giải thuật", "3", "lorem ipsum..."],
        ["KHMT-K61", "Kỹ sư KHMT", "Viện CNTT&TT", "5 năm", "IT4236", "Học máy", "2", "lorem ipsum..."],
      ],
    },
  ];
  return <UploadHistoryWithTitle title="Lịch sử upload CTĐT" histories={histories}></UploadHistoryWithTitle>;
}
