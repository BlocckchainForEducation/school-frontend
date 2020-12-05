function setSessionToken(token) {
  sessionStorage.setItem("token", "Bearer " + token);
}

function setLocalToken(token) {
  localStorage.setItem("token", "Bearer " + token);
}

function getToken() {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
}

function clearToken() {
  sessionStorage.removeItem("token");
  localStorage.removeItem("token");
}

export { setSessionToken, setLocalToken, getToken, clearToken };
