import React from "react";
import TwoPartTable from "../../../../shared/Table/TwoPartTable";

export default function RevokeSearchResult() {
  const title = "Bằng tốt nghiệp đại học BKHN năm 2019";
  const part1 = {
    "Họ và tên": "Nguyễn Văn An",
    "Ngày sinh": "01/01/1998",
    "Giới tính": "Nam",
    Trường: "Đại học Bách Khoa Hà Nội",
    "Ngành học": "Công nghệ thông tin",
    "Loại bằng": "Kỹ sư",
    "Xếp loại tốt nghiệp": "Giỏi",
  };
  const part2 = {
    "Hình thức đào tạo": "Chính quy",
    "Nơi cấp": "Hà Nội",
    "Ngày cấp": "20/08/2019",
    "Hiệu trưởng": "Hoàng Minh Sơn",
    "Số hiệu": "12341231431",
    "Số hiệu vào sổ": "1423445",
    Txid: "0x3fa43bc5798c97a79d70af09",
  };

  return (
    <div className="card">
      <div className="card-header py-2">
        <div className="d-flex justify-content-between align-items-center">
          <span className="font-weight-bold">{title}</span>
          <button className="btn btn-danger ">Thu hồi</button>
        </div>
      </div>
      <TwoPartTable part1={part1} part2={part2}></TwoPartTable>
    </div>
  );
}
