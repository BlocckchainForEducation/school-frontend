import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function CertificateDataExample() {
  const title = "Mẫu file dữ liệu Môn học";
  const fileName = "bang-cap-example.xlsx";
  const head = [
    "Họ và tên",
    "Ngày sinh",
    "Giới tính",
    "Trường",
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
  const body = [
    [
      "Nguyễn Văn An",
      "01/01/1998",
      "Nam",
      "Đại học Bách Khoa Hà Nội",
      "Công nghệ thông tin",
      "Kỹ sư",
      "2019",
      "Giỏi",
      "Chính quy",
      "Hà Nội",
      "20/08/2019",
      "Hoàng Minh Sơn",
      "12431",
      "12341231431",
    ],
    [
      "Nguyễn Văn Bình",
      "01/01/1998",
      "Nam",
      "Đại học Bách Khoa Hà Nội",
      "Công nghệ thông tin",
      "Kỹ sư",
      "2019",
      "Giỏi",
      "Chính quy",
      "Hà Nội",
      "20/08/2019",
      "Hoàng Minh Sơn",
      "12432",
      "12341231432",
    ],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }}></DownloadExampleData>;
}
