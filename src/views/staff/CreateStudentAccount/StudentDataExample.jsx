import React from "react";
import DownloadExampleData from "../../../../shared/DownloadExampleData";

export default function StudentDataExample() {
  const studdents = [
    {
      // count: "1",
      id: "20161234",
      name: "Nguyễn Văn An",
      gender: "Nam",
      birthDay: "20/10/1998",
      hometown: "Từ Sơn, Bắc Ninh",
      cmt: "123456789012",
      k: "K61",
      eduPro: "CNTT2-K61",
    },
    {
      // count: "1",
      id: "20161234",
      name: "Nguyễn Văn An",
      gender: "Nam",
      birthDay: "20/10/1998",
      hometown: "Từ Sơn, Bắc Ninh",
      cmt: "123456789012",
      k: "K61",
      eduPro: "CNTT2-K61",
    },
    {
      // count: "1",
      id: "20161234",
      name: "Nguyễn Văn An",
      gender: "Nam",
      birthDay: "20/10/1998",
      hometown: "Từ Sơn, Bắc Ninh",
      cmt: "123456789012",
      k: "K61",
      eduPro: "CNTT2-K61",
    },
    {
      // count: "1",
      id: "20161234",
      name: "Nguyễn Văn An",
      gender: "Nam",
      birthDay: "20/10/1998",
      hometown: "Từ Sơn, Bắc Ninh",
      cmt: "123456789012",
      k: "K61",
      eduPro: "CNTT2-K61",
    },
  ];
  const title = "Mẫu file dữ liệu sinh viên";
  const heads = ["Mssv", "Họ tên", "Giới tính", "Ngày sinh", "Quê quán", "CMT/CCCD", "Khóa", "Mã CTĐT"];
  const rows = studdents.map((student) => Object.values(student));

  return <DownloadExampleData {...{ title, heads, rows }}></DownloadExampleData>;
}
