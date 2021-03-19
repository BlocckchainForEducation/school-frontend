import axios from "axios";

let remember = true;

function setRemember(_remember) {
  remember = _remember;
}

function getRemember() {
  return remember;
}

function setToken(token) {
  if (remember) localStorage.setItem("token", "Bearer " + token);
  else sessionStorage.setItem("token", "Bearer " + token);
}

function setSessionToken(token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  sessionStorage.setItem("token", "Bearer " + token);
}

function setLocalToken(token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  localStorage.setItem("token", "Bearer " + token);
}

function getToken() {
  if (remember) return localStorage.getItem("token");
  else return sessionStorage.getItem("token");
}

function clearToken() {
  if (remember) {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
  } else {
    sessionStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
  }
}

export { setSessionToken, setLocalToken, getToken, clearToken, setRemember, getRemember, setToken };
