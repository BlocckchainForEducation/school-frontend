import React from "react";
import UploadFileInputWithTitle from "../../../../shared/UploadFileInput";
import TeacherDataExample from "./TeacherDataExample";
import TeacherUploadHistory from "./TeacherUploadHistory";

export default function CreateTeacherAccount() {
  return (
    <div>
      <div className="mb-3">
        <TeacherDataExample></TeacherDataExample>
      </div>
      <div className="mb-3">
        <UploadFileInputWithTitle title="Upload file excel Giảng viên"></UploadFileInputWithTitle>
      </div>
      <div className="mb-3">
        <TeacherUploadHistory></TeacherUploadHistory>
      </div>
    </div>
  );
}
