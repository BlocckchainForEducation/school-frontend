import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function SubjectDataExample() {
  const title = "Mẫu file dữ liệu Môn học";
  const fileName = "mon-hoc-example.xlsx";
  const head = ["Mã môn học", "Tên môn học", "Kì học", "Số tín chỉ", "Ghi chú"];
  const body = [
    ["EM1170", "	Pháp luật đại cương", "1", "2", "Chung toàn trường"],
    ["SSH1050", "Tư tưởng HCM	", "3", "2", "Chung toàn trường"],
    ["IT1110", "Tin học đại cương", "3", "4", "BB khối kỹ thuật"],
    ["MI1110", "Giải tích I", "1", "4", "BB khối kỹ thuật	"],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
