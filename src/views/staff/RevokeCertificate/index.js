import React from "react";
import RevokeForm from "./RevokeForm";
import RevokeSearchResult from "./RevokeSearchResult";

export default function RevokeCertificate() {
  return (
    <div>
      <div className="mb-3">
        <RevokeForm></RevokeForm>
      </div>
      <div className="mb-3">
        <RevokeSearchResult></RevokeSearchResult>
      </div>
    </div>
  );
}
