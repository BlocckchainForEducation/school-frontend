import React from "react";
import UploadFileInputWithTitle from "../../../../shared/UploadFileInput";
import CertificateDataExample from "./CertificateDataExample";

export default function UploadCertificate() {
  return (
    <div>
      <div className="mb-3">
        <CertificateDataExample></CertificateDataExample>
      </div>
      <div className="mb-3">
        <UploadFileInputWithTitle title="Upload file excel Bằng cấp"></UploadFileInputWithTitle>
      </div>
      <div className="mb-3"></div>
    </div>
  );
}
