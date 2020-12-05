import React from "react";
import UploadFileInputWithTitle from "../../../../shared/UploadFileInput";
import BureauDataExample from "./BureauDataExample";
import BureauUploadHistory from "./BureauUploadHistory";

export default function CreateBureauAccount() {
  return (
    <div>
      <div className="mb-3">
        <BureauDataExample></BureauDataExample>
      </div>
      <div className="mb-3">
        <UploadFileInputWithTitle title="Upload file excel Giáo vụ"></UploadFileInputWithTitle>
      </div>
      <div className="mb-3">
        <BureauUploadHistory></BureauUploadHistory>
      </div>
    </div>
  );
}
