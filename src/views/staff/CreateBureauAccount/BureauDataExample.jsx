import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function BureauDataExample() {
  const title = "Mẫu file dữ liệu Giáo vụ Viện";
  const fileName = "giao-vu-example.xlsx";
  const head = ["Mã giáo vụ", "Họ và tên", "Email", "Viện", "Khóa công khai"];
  const body = [
    ["GVu1234", "Nguyễn Văn B", "nguyenvanb@soict.hust.edu.vn", "Viện CNTT&TT", "A0X+4i2FyudeVsKB6NLv8uLoGTcfBGEczZucKNwJdSMF"],
    ["GVu1235", "Lý Thị C", "lythic@spkt.hust.edu.vn", "Viện Sư phạm Kỹ thuật", "AnLpO4jxLPGUjNBpJmnOja/FpXdncPS363uMJwYnS0n9"],
    ["GVu1236", "Lê Thị D", "lethidc@nn.hust.edu.vn", "Viện Ngoại ngữ", "Aq7DZm5J4jBJNPMCSaEAg2qOY9icCYoigIBOLAN8WPiV"],
    ["GVu1237", "Trần Văn E", "tranvane@dtvt.hust.edu.vn", "Viện Điện tử viễn thông", "AxrZLzzkIheuNY3Ff0VawaXdVAdjlGq61bUAocL/ZXgG"],
    ["GVu1238", "Đào Thị F", "daothif@dktdh.hust.edu.vn", "Viện Điều khiển Tự động hóa", "A22V6uhd9uFISY7IcQshKuJ5sEBMuoORHqsTYL5gHQav"],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
