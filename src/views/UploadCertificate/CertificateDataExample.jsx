import React from "react";
import DownloadExampleData from "../../../../shared/DownloadExampleData";
var FileSaver = require("file-saver");

export default function CertificateDataExample() {
  const title = "Mẫu file dữ liệu bằng cấp";
  const heads = [
    "Họ và tên",
    "Ngày sinh",
    "Giới tính",
    "Ngành học",
    "Loại bằng",
    "Năm tốt nghiệp",
    "Xếp loại",
    "Hình thức đào tạo",
    "Nơi cấp",
    "Ngày cấp",
    "Hiệu trưởng",
    "Số hiệu",
    "Số hiệu vào sổ",
  ];
  const rows = [
    ["Nguyễn Văn An", "01/01/1998", "Nam", "HTTT", "Kỹ sư", "2019", "Giỏi", "Chính quy", "Hà Nội", "01/01/2019", "Hoàng Minh Sơn", "1234512354234", "123456"],
    ["Nguyễn Văn An", "01/01/1998", "Nam", "HTTT", "Kỹ sư", "2019", "Giỏi", "Chính quy", "Hà Nội", "01/01/2019", "Hoàng Minh Sơn", "1234512354234", "123456"],
    ["Nguyễn Văn An", "01/01/1998", "Nam", "HTTT", "Kỹ sư", "2019", "Giỏi", "Chính quy", "Hà Nội", "01/01/2019", "Hoàng Minh Sơn", "1234512354234", "123456"],
  ];
  async function hdClickDownload() {
    FileSaver.saveAs(`${process.env.REACT_APP_SERVER_URL}/uni-staff/get-cert-template`, "cert-template.xlsx");
  }
  return <DownloadExampleData {...{ title, heads, rows, hdClickDownload }}></DownloadExampleData>;
}
