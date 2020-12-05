import React from "react";
import DownloadExampleData from "../../../../shared/DownloadExampleData";

export default function BureauDataExample() {
  const title = "Mẫu file dữ liệu Giáo vụ Viện";
  const heads = ["Mã số CB", "Họ và tên", "Email", "Viện", "Tài khoản", "Mật khẩu"];
  const rows = [
    ["CB1234", "Nguyễn Văn B", "nguyenvanb@soict.hust.edu.vn", "Viện CNTT&TT", "hust_soict_bnv", "ew98sf23x"],
    ["CB1235", "Nguyễn Thị C", "nguyenthic@spkt.hust.edu.vn", "Viện Sư phạm Kỹ thuật", "hust_spkt_cnt", "a6a8cva90"],
  ];
  return <DownloadExampleData {...{ title, heads, rows }}></DownloadExampleData>;
}
