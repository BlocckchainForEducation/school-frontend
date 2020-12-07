import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function TeacherDataExample() {
  const title = "Mẫu file dữ liệu Giảng viên";
  const fileName = "giang-vien-example.xlsx";
  const head = ["Mã giảng viên", "Họ và tên", "Email", "Viện", "Khóa công khai"];
  const body = [
    ["GV1234", "Nguyễn Văn B", "nguyenvanb@soict.hust.edu.vn", "Viện CNTT&TT", "A0X+4i2FyudeVsKB6NLv8uLoGTcfBGEczZucKNwJdSMF"],
    ["GV1235", "Lý Thị C", "lythic@spkt.hust.edu.vn", "Viện Sư phạm Kỹ thuật", "AnLpO4jxLPGUjNBpJmnOja/FpXdncPS363uMJwYnS0n9"],
    ["GV1236", "Lê Thị D", "lethidc@nn.hust.edu.vn", "Viện Ngoại ngữ", "Aq7DZm5J4jBJNPMCSaEAg2qOY9icCYoigIBOLAN8WPiV"],
    ["GV1237", "Trần Văn E", "tranvane@dtvt.hust.edu.vn", "Viện Điện tử viễn thông", "AxrZLzzkIheuNY3Ff0VawaXdVAdjlGq61bUAocL/ZXgG"],
    ["GV1238", "Đào Thị F", "daothif@dktdh.hust.edu.vn", "Viện Điều khiển Tự động hóa", "A22V6uhd9uFISY7IcQshKuJ5sEBMuoORHqsTYL5gHQav"],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
