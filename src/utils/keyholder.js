let privateKeyHex = null;

export async function requirePrivateKeyHex(enqueueSnackbar) {
  if (!privateKeyHex) {
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
  } else {
    return privateKeyHex;
  }
}

export async function askPrivateKeyHexFromWallet() {
  return new Promise((resolve, reject) => {
    window.postMessage({ type: "SIGN_REQUEST" }, "*");
    window.addEventListener("message", function (event) {
      if (event.data.type === "SIGN_RESPONSE") {
        if (event.data.accept) {
          const privKeyBase64 = event.data.account.privateKey;
          const privateKeyHex = Buffer.from(privKeyBase64, "base64").toString("hex");
          return resolve({ ok: true, privateKeyHex: privateKeyHex });
        } else {
          return resolve({ ok: false });
        }
      }
    });
  });
}
