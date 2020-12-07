import React from "react";
import UploadFileInputWithTitle from "../../../../shared/UploadFileInput";
import EduProDataExample from "./EduProDataExample";
import EduProUploadHistory from "./EduProUploadHistory";

export default function UploadEduPro() {
  return (
    <div>
      <div className="mb-3">
        <EduProDataExample></EduProDataExample>
      </div>
      <div className="mb-3">
        <UploadFileInputWithTitle title="Upload file excel CTĐT"></UploadFileInputWithTitle>
      </div>
      <div className="mb-3">
        <EduProUploadHistory></EduProUploadHistory>
      </div>
    </div>
  );
}
