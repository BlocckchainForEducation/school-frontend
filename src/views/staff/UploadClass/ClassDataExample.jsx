import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function ClassDataExample() {
  const title = "Mẫu file dữ liệu Lớp học";
  const fileName = "v1.2/lop-hoc-example.xlsx";
  const head = [
    "Kỳ học*",
    "Mã lớp học*",
    "Mã môn học*",
    "Tên môn học*",
    "Số tín chỉ*",
    "Ghi chú lớp học",
    "Mã Giảng Viên*",
    "Mã Giáo Vụ*",
    "Mã số sinh viên*",
  ];
  const body = [
    [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00010", "GVu00001", 20195753],
    [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00010", "GVu00001", 20195754],
    [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00010", "GVu00001", 20195755],
    [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00010", "GVu00001", 20195756],
    // [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00010", "GVu00001", 20196277],
    // [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00010", "GVu00001", 20196278],
    // [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00010", "GVu00001", 20195757],
    // [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00010", "GVu00001", 20195758],
    // [20202, 125457, "AC2030", "Khai thác thông tin đa phương tiện", 2, "CN giáo dục-K64S", "GV00010", "GVu00001", 20195759],
    [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00011", "GVu00002", 20195753],
    [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00011", "GVu00002", 20195754],
    [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00011", "GVu00002", 20195755],
    [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00011", "GVu00002", 20195756],
    // [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00011", "GVu00002", 20196277],
    // [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00011", "GVu00002", 20196278],
    // [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00011", "GVu00002", 20195757],
    // [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00011", "GVu00002", 20195758],
    // [20202, 125458, "AC2060", "Nhập môn trí tuệ nhân tạo", 3, "CN giáo dục-K64S", "GV00011", "GVu00002", 20195759],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }} minWidth={"1500px"}></DownloadExampleData>;
}
