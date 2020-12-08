const ROLE = {
  STAFF: "STAFF",
  BUREAU: "BUREAU",
  TEACHER: "TEACHER",
};

function setLocalRole(role) {
  localStorage.setItem("role", role);
}

function setSessionRole(role) {
  sessionStorage.setItem("role", role);
}

function getRole() {
  return sessionStorage.getItem("role") || localStorage.getItem("role");
}

function clearRole() {
  sessionStorage.removeItem("role");
  localStorage.removeItem("role");
}

function getRouteByRole(role) {
  if (role === ROLE.STAFF) {
    return "/cb-pdt/dang-ki-tham-gia";
  } else if (role === ROLE.TEACHER) {
    return "/giang-vien/thong-tin-ca-nhan";
  } else if (role === ROLE.BUREAU) {
    return "/giao-vu/thong-tin-ca-nhan";
  }
}

export { ROLE, getRouteByRole, setLocalRole, setSessionRole, getRole, clearRole };
