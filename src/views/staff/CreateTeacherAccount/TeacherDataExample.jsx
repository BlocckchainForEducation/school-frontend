import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function TeacherDataExample() {
  const title = "Mẫu file dữ liệu Giảng viên";
  const fileName = "giang-vien-example.xlsx";
  const head = ["Mã giảng viên", "Họ và tên", "Email", "Viện", "Khóa công khai"];
  const body = [
    ["GV1234", "Nguyễn Văn B", "nguyenvanb@soict.hust.edu.vn", "Viện CNTT&TT", "31d0e835390695f825a1322b38bdb3de71c075..."],
    ["GV1235", "Lý Thị C", "lythic@spkt.hust.edu.vn", "Viện Sư phạm Kỹ thuật", "81741c77ad5e5ff27ec91a94ced51b82a37968..."],
    ["GV1236", "Lê Thị D", "lethidc@nn.hust.edu.vn", "Viện Ngoại ngữ", "ecfdc8f69b08d0260ba2309d7b8e064a28f0eb5..."],
    ["GV1237", "Trần Văn E", "tranvane@dtvt.hust.edu.vn", "Viện Điện tử viễn thông", "4d4ebfbf5ea1f3b61b04434528844956ab6890536..."],
    ["GV1238", "Đào Thị F", "daothif@dktdh.hust.edu.vn", "Viện Điều khiển Tự động hóa", "4d4ebfbf5ea1f3b61b04434528844956ab6890..."],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
