import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function ClassDataExample() {
  const title = "Mẫu file dữ liệu Lớp học";
  const fileName = "lop-hoc-example.xlsx";
  const head = ["Kì học", "Mã môn học", "Mã lớp học", "Mã GV", "DSSV"];
  const body = [
    ["20201", "	SSH1050", "117123", "GV1234", "20161234, 201612345, 20161236, 20161237"],
    ["20201", "EM1170", "117124", "GV1235", "20161234, 201612345, 20161236, 20161237"],
    ["20201", "IT1110	", "685542", "GV1236", "20161234, 201612345, 20161236, 20161237"],
    ["20201", "MI1110", "685547", "GV1237", "20161234, 201612345, 20161236, 20161237"],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
