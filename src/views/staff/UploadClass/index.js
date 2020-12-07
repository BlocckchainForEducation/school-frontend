import React from "react";
import UploadFileInputWithTitle from "../../../../shared/UploadFileInput";
import ClassDataExample from "./ClassDataExample";

export default function UploadClass() {
  return (
    <div>
      <div className="mb-3">
        <ClassDataExample></ClassDataExample>
      </div>
      <div className="mb-3">
        <UploadFileInputWithTitle title="Upload file excel Lớp học"></UploadFileInputWithTitle>
      </div>
      <div className="mb-3"></div>
    </div>
  );
}
