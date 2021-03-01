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
  const result = await askPrivateKeyHexFromWallet();
  if (!result.ok) {
    enqueueSnackbar("Bạn cần cung cấp private key để có thể thực hiện thao tác này!", {
      variant: "error",
      anchorOrigin: { vertical: "top", horizontal: "center" },
    });
    return Promise.reject({ ok: false });
  } else {
    privateKeyHex = result.privateKeyHex;
    return privateKeyHex;
  }
}

export async function askPrivateKeyHexFromWallet() {
  return new Promise((resolve, reject) => {
    const tabId = Math.floor(Math.random() * 9999);
    window.postMessage({ type: "SIGN_REQUEST", tabId });
    window.addEventListener("message", function (event) {
      if (event.data.type === "SIGN_RESPONSE" && event.data.tabId === tabId) {
        if (event.data.accept) {
          return resolve({ ok: true, privateKeyHex: event.data.account.privateKey });
        } else {
          return resolve({ ok: false });
        }
      }
    });
  });
}

// !!! this function not work,,, we need separe to 2 function as above, so the first fx can await the second
// export async function requirePrivateKeyHex(enqueueSnackbar) {
//   if (privateKeyHex) return privateKeyHex;
//   enqueueSnackbar("Hãy mở ví và chọn tài khoản!", { variant: "info", anchorOrigin: { vertical: "top", horizontal: "center" } });
//   const tabId = Math.floor(Math.random() * 9999);
//   window.postMessage({ type: "SIGN_REQUEST", tabId });
//   window.addEventListener("message", (event) => {
//     if (event.data.type === "SIGN_RESPONSE" && event.data.tabId === tabId) {
//       if (event.data.accept) {
//         privateKeyHex = event.data.account.privateKey;
//         return privateKeyHex;
//       } else {
//         enqueueSnackbar("Bạn cần cung cấp private key để có thể thực hiện thao tác này!", {
//           variant: "error",
//           anchorOrigin: { vertical: "top", horizontal: "center" },
//         });
//         return Promise.reject();
//       }
//     }
//   });
// }
