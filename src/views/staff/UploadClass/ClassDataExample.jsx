import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function ClassDataExample() {
  const title = "Mẫu file dữ liệu Lớp học";
  const fileName = "v1.2/lop-hoc-example.xlsx";
  const head = ["Kỳ học*", "Mã lớp học*", "Mã môn học*", "Tên môn học*", "Số tín chỉ*", "Ghi chú lớp học", "Mã Giảng Viên*", "MSSV*"];
  const body = [
    [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00001", 20195753],
    [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00001", 20195754],
    [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00001", 20195755],
    [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00001", 20195756],
    [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00002", 20195753],
    [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00002", 20195754],
    [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00002", 20195755],
    [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00002", 20195756],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
