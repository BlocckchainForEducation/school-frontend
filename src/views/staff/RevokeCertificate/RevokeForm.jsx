import React from "react";

export default function RevokeForm() {
  return (
    <div className="card">
      <div className="card-header font-weight-bold">Nhập thông tin tìm kiếm</div>
      <div className="card-body">
        <form action="" className="form-inline justify-content-between">
          <div className="input-group">
            <div className="input-group-prepend">
              <label htmlFor="" className="input-group-text">
                MSSV
              </label>
              <input type="text" className="form-control" size="8" defaultValue="20161234" />
            </div>
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <label htmlFor="" className="input-group-text">
                Họ tên
              </label>
            </div>
            <input type="text" className="form-control" />
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <label htmlFor="" className="input-group-text">
                Số hiệu BC
              </label>
            </div>
            <input type="text" className="form-control" size="25" />
          </div>
          <button type="submit" className="btn btn-primary">
            Tìm kiếm
          </button>
        </form>
      </div>
    </div>
  );
}
