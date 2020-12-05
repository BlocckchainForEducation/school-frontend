import React from "react";
import UploadHistoryWithTitle from "../../../../shared/UploadHistory/UploadHistoryWithTitle";

export default function TeacherUploadHistory() {
  const histories = [
    {
      id: "#1 - ",
      time: "01/01/2020",
      heads: ["Mã số GV", "Họ và tên", "Email", "Khoa/Viện", "Tài khoản", "Mật khẩu"],
      rows: [
        ["GV0001", "Nguyễn Văn D", "nguyenvand@soict.hust.edu.vn", "Viện Cơ Khí", "hust_ck_gv0001", "as7uzxc0s"],
        ["GV0002", "Nguyễn Thị E", "nguyenthie@spkt.hust.edu.vn", "Viện Ngoại ngữ", "hust_nn_gv0002", "xcv98ajfa9"],
      ],
    },
  ];
  return (
    <UploadHistoryWithTitle title={"Lịch sử tạo tài khoản Giảng viên"} histories={histories}></UploadHistoryWithTitle>
  );
}
