import React from "react";
import UploadHistoryWithTitle from "../../../../shared/UploadHistory/UploadHistoryWithTitle";

export default function StudentUploadHistory() {
  const histories = [
    {
      id: "#1 - ",
      time: "01/01/2020",
      heads: ["Mssv", "Họ tên", "Giới tính", "Ngày sinh", "Quê quán", "Khóa", "CTĐT", "Username", "Password"],
      rows: [
        [
          // count: "1",
          "20161234",
          "Nguyễn Văn An",
          "Nam",
          "20/10/1998",
          "Từ Sơn, Bắc Ninh",
          "K61",
          "CNTT",
          "bkhn_annv_201098",
          "we89xvaf",
        ],
        [
          // count: "1",
          "20161234",
          "Nguyễn Văn An",
          "Nam",
          "20/10/1998",
          "Từ Sơn, Bắc Ninh",
          "K61",
          "CNTT",
          "bkhn_annv_201098",
          "we89xvaf",
        ],
      ],
    },
    {
      id: "#2 - ",
      time: "02/01/2020",
      heads: ["Mssv", "Họ tên", "Giới tính", "Ngày sinh", "Quê quán", "Khóa", "CTĐT", "Username", "Password"],
      rows: [
        [
          // count: "1",
          "20161234",
          "Nguyễn Văn An",
          "Nam",
          "20/10/1998",
          "Từ Sơn, Bắc Ninh",
          "K61",
          "CNTT",
          "bkhn_annv_201098",
          "we89xvaf",
        ],
        [
          // count: "1",
          "20161234",
          "Nguyễn Văn An",
          "Nam",
          "20/10/1998",
          "Từ Sơn, Bắc Ninh",
          "K61",
          "CNTT",
          "bkhn_annv_201098",
          "we89xvaf",
        ],
      ],
    },
  ];

  return <UploadHistoryWithTitle title={"Lịch sử upload sinh viên"} histories={histories}></UploadHistoryWithTitle>;
}
