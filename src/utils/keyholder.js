let privateKeyHex = null;

export function setPrivateKeyHex(privateKeyHexParam) {
  privateKeyHex = privateKeyHexParam;
}

// export function getPrivateKeyHex() {
//   return privateKeyHex;
// }

export async function requirePrivateKeyHex(enqueueSnackbar) {
  if (privateKeyHex) return privateKeyHex;
  enqueueSnackbar("Hãy mở ví và chọn tài khoản!", { variant: "info", anchorOrigin: { vertical: "top", horizontal: "center" } });
  return new Promise((resolve, reject) => {
    const tabId = Math.floor(Math.random() * 9999);
    window.addEventListener("message", function (event) {
      if (event.data.type === "SIGN_RESPONSE" && event.data.tabId === tabId) {
        if (event.data.accept) {
          privateKeyHex = event.data.account.privateKey;
          resolve(privateKeyHex);
        } else {
          enqueueSnackbar("Bạn cần chọn một tài khoản để có thể thực hiện thao tác này!", {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" },
          });
          reject();
        }
      }
    });
    window.postMessage({ type: "SIGN_REQUEST", tabId });
  });
}
