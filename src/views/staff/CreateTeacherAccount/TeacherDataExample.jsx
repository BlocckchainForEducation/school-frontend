import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function TeacherDataExample() {
  const title = "Mẫu file dữ liệu Giảng viên";
  const fileName = "v1.2/giang-vien-example.xlsx";
  const head = ["Khoa/Viện*", "Bộ môn*", "Mã giảng viên*", "Họ và tên*", "Email*", "Số điện thoại"];
  const body = [
    ["KCNTT", "KHMT", "GV00010", "Vũ Văn Thiệu", "thieu.vuvan@hust.edu.vn", 982928307],
    ["KCNTT", "CNPM", "GV00011", "Nguyễn Phi Lê", "le.nguyenphi@hust.edu.vn", 1662257624],
    ["KCNTT", "VP", "GV00012", "Nguyễn Phi Lê", "le.nguyenphi@hust.edu.vn", 1662257624],
    ["KCNTT", "VP", "GV00013", "Umi Hirose", "umi.hirose@soict.hust.edu.vn"],
    ["KCNTT", "HTTT", "GV00014", "Nguyễn Ngọc Bích A", "bichann@soict.hust.edu.vn"],
    ["KCNTT", "KTMT", "GV00015", "Ngô Lam Trung (1.0)", "trung.ngolam@hust.edu.vn", "0968 395 999"],
    // ["KCNTT", "KTMT", "GV00016", "Nguyễn Văn Hiên (0.0)", "nguyenvanhienbkhn@gmail.com"],
    // ["KCNTT", "TTMMT", "GV00017", "Nguyễn Linh Giang", "giang.nguyenlinh@hust.edu.vn", 912725672],
    // ["KCNTT", "KHMT", "GV00018", "Đỗ Quốc Huy", "huy.doquoc@hust.edu.vn", 936356172],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
