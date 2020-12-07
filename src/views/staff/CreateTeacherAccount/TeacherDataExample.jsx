import React from "react";
import DownloadExampleData from "../../../../shared/DownloadExampleData";

export default function TeacherDataExample() {
  const title = "Mẫu file dữ liệu Giảng viên";
  const heads = ["Mã số GV", "Họ và tên", "Email", "Khoa/Viện", "Tài khoản", "Mật khẩu"];
  const rows = [
    ["GV0001", "Nguyễn Văn D", "nguyenvand@soict.hust.edu.vn", "Viện Cơ Khí", "", ""],
    ["GV0002", "Nguyễn Thị E", "nguyenthie@spkt.hust.edu.vn", "Viện Ngoại ngữ", "", ""],
  ];
  return <DownloadExampleData {...{ title, heads, rows }}></DownloadExampleData>;
}
