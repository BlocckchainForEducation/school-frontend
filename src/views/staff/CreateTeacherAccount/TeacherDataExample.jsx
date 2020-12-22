import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function TeacherDataExample() {
  const title = "Mẫu file dữ liệu Giảng viên";
  const fileName = "giang-vien-example.xlsx";
  const head = ["Mã giảng viên", "Họ và tên", "Email", "Viện", "Khóa công khai"];
  const body = [
    ["GV1234", "Nguyễn Văn X", "nguyenvanx@soict.hust.edu.vn", "Viện CNTT&TT", "02a2e3f2b6b9ec1155979ee691072bd17f..."],
    ["GV1235", "Nguyễn Văn Y", "nguyenvany@spkt.hust.edu.vn", "Viện Sư phạm Kỹ thuật", "02992cf23456bf4167fc2d69f70ee36361a..."],
    ["GV1236", "Trần Thị Z", "lethidc@nn.hust.edu.vn", "Viện Ngoại ngữ", "028b921e7d9e7e0ece5660dc48e6c7b84..."],
    ["GV1237", "Trần Văn T", "tranvane@dtvt.hust.edu.vn", "Viện Điện tử viễn thông", "02a09d011afd12783ab87f44ad1932dcca..."],
    ["GV1238", "Đào Thị W", "daothiw@dktdh.hust.edu.vn", "Viện Điều khiển Tự động hóa", "0351befccfa9fa6ba05d16a2eb94a593f77..."],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
