import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function ClassDataExample() {
  const title = "Mẫu file dữ liệu Lớp học";
  const fileName = "lop-hoc-example.xlsx";
  const head = ["Kì học", "Mã môn học", "Mã lớp học", "Mã GV", "DSSV"];
  const body = [
    ["20201", "	SSH1170", "117123", "GV001", "20201234, 202012345, 20201236, 20206787"],
    ["20201", "SSH1170", "117124", "GV002", "20201234, 202012345, 20201236, 20206787"],
    ["20201", "MI1110	", "685542", "GV003", "20201234, 202012345, 20201236, 20206787"],
    ["20201", "MI1110", "685547", "GV004", "20201234, 202012345, 20201236, 20206787"],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
