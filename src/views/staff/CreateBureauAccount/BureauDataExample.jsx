import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function BureauDataExample() {
  const title = "Mẫu file dữ liệu Giáo vụ Viện";
  const fileName = "giao-vu-example.xlsx";
  const head = ["Mã giáo vụ", "Họ và tên", "Email", "Viện", "Khóa công khai"];
  const body = [
    ["GVU1234", "Nguyễn Văn B", "nguyenvanb@gvu.soict.hust.edu.vn", "Viện CNTT&TT", "03828edbbdf81522657d2618d06ddf1bd..."],
    ["GVU1235", "Lý Thị C", "lythic@gvu.spkt.hust.edu.vn", "Viện Sư phạm Kỹ thuật", "03ab5f057da235b71b082f906292a37aa3..."],
    ["GVU1236", "Lê Thị D", "lethidc@gvu.nn.hust.edu.vn", "Viện Ngoại ngữ", "02b4adb050cc2429a8375c8a5d0a13395..."],
    ["GVU1237", "Trần Văn E", "tranvane@gvu.dtvt.hust.edu.vn", "Viện Điện tử viễn thông", "021d85da863f80e8067960374d333aaaa..."],
    ["GVU1238", "Đào Thị F", "daothif@gvu.dktdh.hust.edu.vn", "Viện Điều khiển Tự động hóa", "02502dbc748bded2563cf985b6560073c2f..."],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
