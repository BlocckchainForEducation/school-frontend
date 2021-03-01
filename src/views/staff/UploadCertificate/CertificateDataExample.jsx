import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function CertificateDataExample() {
  const title = "Mẫu file dữ liệu Bằng cấp";
  const fileName = "v1.2/bang-cap-example.xlsx";
  const head = [
    "Mã số sinh viên",
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
  const body = [
    [20195753, "Kỹ sư", 2019, "Giỏi", "Chính quy", "Hà Nội", "20/11/2020", "Huỳnh Quyết Thắng", 1782649, 48727982437],
    [20195754, "Kỹ sư", 2019, "Giỏi", "Chính quy", "Hà Nội", "20/11/2020", "Huỳnh Quyết Thắng", 1784563, 48727982423],
    [20195755, "Kỹ sư", 2019, "Giỏi", "Chính quy", "Hà Nội", "20/11/2020", "Huỳnh Quyết Thắng", 1784567, 48727982426],
    [20195756, "Kỹ sư", 2019, "Giỏi", "Chính quy", "Hà Nội", "20/11/2020", "Huỳnh Quyết Thắng", 1784568, 48727982429],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }} minWidth={"1500px"}></DownloadExampleData>;
}
