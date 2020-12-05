import React from "react";
import DownloadExampleData from "../../../../shared/DownloadExampleData";

export default function ClassDataExample() {
  const title = "Mẫu file dữ liệu lớp học";
  const heads = ["Mã lớp học", "Kì học", "Mã HP", "Mã Gv", "MSSV", "Loại lớp"];
  const rows = [
    ["112934", "20191", "IT1234", "GV0001", "20165268", "LT"],
    // ["112934", "20191", "IT1234", "GV0001", "20161235", "LT"],
    // ["112934", "20191", "IT1234", "GV0001", "20161236", "LT"],
    ["112934", "20191", "IT1234", "GV0001", "20162467", "LT"],
    ["112934", "20191", "IT1234", "GV0001", "20160958", "LT"],
    ["112934", "20191", "IT1234", "GV0001", "20171239", "LT"],
    ["681297", "20191", "IT4312", "GV0002", "20189879", "BT"],
    ["681297", "20191", "IT4312", "GV0002", "20179878", "BT"],
    ["681297", "20191", "IT4312", "GV0002", "20179877", "BT"],
    // ["681297", "20191", "IT4312", "GV0002", "20169876", "BT"],
    // ["681297", "20191", "IT4312", "GV0002", "20169876", "BT"],
  ];
  return <DownloadExampleData {...{ title, heads, rows }}></DownloadExampleData>;
}
