import React from "react";
import UploadFileInputWithTitle from "../../../../shared/UploadFileInput";
import StudentDataExample from "./StudentDataExample";
import StudentUploadHistory from "./StudentUploadHistory";

export default function CreateStudentAccount() {
  return (
    <div className="pb-5">
      <div>
        <StudentDataExample></StudentDataExample>
      </div>

      <div className="mt-3">
        <UploadFileInputWithTitle
          title={"Upload file excel sinh viên"}
          placeholder="Chọn file excel sinh viên"
        ></UploadFileInputWithTitle>
      </div>

      <div className="mt-3">
        <StudentUploadHistory></StudentUploadHistory>
      </div>
    </div>
  );
}
