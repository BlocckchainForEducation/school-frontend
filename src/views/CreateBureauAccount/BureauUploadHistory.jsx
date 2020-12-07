import React from "react";
import UploadHistory from "../../shared/UploadHistory/UploadHistory";

export default function BureauUploadHistory() {
  const histories = [
    {
      id: "#1 - ",
      time: "01/01/2020",
      heads: ["Mã số CB", "Họ và tên", "Email", "Viện", "Tài khoản", "Mật khẩu"],
      rows: [
        ["CB1234", "Nguyễn Văn B", "nguyenvanb@soict.hust.edu.vn", "Viện CNTT&TT", "hust_soict_bnv", "ew98sf23x"],
        ["CB1235", "Nguyễn Thị C", "nguyenthic@spkt.hust.edu.vn", "Viện Sư phạm Kỹ thuật", "hust_spkt_cnt", "a6a8cva90"],
      ],
    },
    {
      id: "#2 - ",
      time: "02/01/2020",
      heads: ["Mã số CB", "Họ và tên", "Email", "Viện", "Tài khoản", "Mật khẩu"],
      rows: [
        ["CB1234", "Nguyễn Văn B", "nguyenvanb@soict.hust.edu.vn", "Viện CNTT&TT", "hust_soict_bnv", "ew98sf23x"],
        ["CB1235", "Nguyễn Thị C", "nguyenthic@spkt.hust.edu.vn", "Viện Sư phạm Kỹ thuật", "hust_spkt_cnt", "a6a8cva90"],
      ],
    },
    {
      id: "#3 - ",
      time: "03/01/2020",
      heads: ["Mã số CB", "Họ và tên", "Email", "Viện", "Tài khoản", "Mật khẩu"],
      rows: [
        ["CB1234", "Nguyễn Văn B", "nguyenvanb@soict.hust.edu.vn", "Viện CNTT&TT", "hust_soict_bnv", "ew98sf23x"],
        ["CB1235", "Nguyễn Thị C", "nguyenthic@spkt.hust.edu.vn", "Viện Sư phạm Kỹ thuật", "hust_spkt_cnt", "a6a8cva90"],
      ],
    },
  ];
  return <UploadHistory histories={histories}></UploadHistory>;
}
