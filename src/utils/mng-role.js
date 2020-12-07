const ROLE = {
  STAFF: "STAFF",
  BUREAU: "BUREAU",
  TEACHER: "TEACHER",
};

function getRouteByRole(role) {
  if (role === ROLE.STAFF) {
    return "/cb-pdt/dang-ki-tham-gia";
  } else if (role === ROLE.TEACHER) {
    return "/giang-vien/thong-tin-ca-nhan";
  } else if (role === ROLE.BUREAU) {
    return "/giao-vu/thong-tin-ca-nhan";
  }
}

export { ROLE, getRouteByRole };
