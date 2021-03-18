import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function ClassDataExample() {
  const title = "Mẫu file dữ liệu Lớp học";
  const fileName = "v1.2/lop-hoc-example.xlsx";
  const head = ["Kỳ học*", "Mã lớp học*", "Mã môn học*", "Tên môn học*", "Số tín chỉ*", "Ghi chú lớp học", "Mã Giảng Viên*", "DSSV*"];
  const body = [
    [
      20201,
      118161,
      "IT3180",
      "Nhập môn công nghệ phần mềm",
      3,
      "**Tài năng-CNTT-K63C, ",
      "GV0001",
      "20195753,20195754,20195755,20195756,20196277,20196278,20195757,20195758,20195759",
    ],
    [
      20201,
      118585,
      "IT3040",
      "Kỹ thuật lập trình",
      2,
      "Công nghệ thông tin-K63C, ",
      "GV0001",
      "20195753,20195754,20195755,20195756,20196277,20196278,20195757,20195758,20195759",
    ],
    [
      20201,
      118614,
      "IT4501",
      "Đảm bảo chất lượng Phần mềm",
      2,
      "CNTT-mô đun 2; KHMT-mô đun 1-K62S, ",
      "GV0001",
      "20195753,20195754,20195755,20195756,20196277,20196278,20195757,20195758,20195759",
    ],
    [
      20201,
      117873,
      "IT4501Q",
      "Đảm bảo chất lượng phần mềm ",
      2,
      "[SIE-130-Tiếng Pháp]-G-INP15S, ",
      "GV0001",
      "20195753,20195754,20195755,20195756,20196277,20196278,20195757,20195758,20195759",
    ],
    [
      20201,
      119435,
      "IT1140",
      "Tin học đại cương",
      4,
      "KTHH 01,02,03,04-K64S, ",
      "GV0003",
      "20195753,20195754,20195755,20195756,20196277,20196278,20195757,20195758,20195759",
    ],
    [
      20201,
      118626,
      "IT4906",
      "Tính toán tiến hóa",
      3,
      "KHMT-mô đun 3-K62C, ",
      "GV0003",
      "20195753,20195754,20195755,20195756,20196277,20196278,20195757,20195758,20195759",
    ],
    [
      20201,
      121354,
      "IT3220",
      "C Programming (Introduction)",
      2,
      "*ICT-3-K64S, ",
      "GV0004",
      "20195753,20195754,20195755,20195756,20196277,20196278,20195757,20195758,20195759",
    ],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
