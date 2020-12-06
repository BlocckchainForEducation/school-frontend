import React from "react";
import UploadHistory from "./UploadHistory";

export default function UploadHistoryWithTitle({ title, histories }) {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="font-weight-bold">{title}</div>
        </div>
        <div className="card-body">
          <UploadHistory histories={histories}></UploadHistory>
        </div>
      </div>
    </div>
  );
}
