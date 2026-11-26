document
  .getElementById("generateToken")
  .addEventListener("click", async function () {
    const header = document.getElementById("header").value;
    const payload = document.getElementById("payload").value;

    const encodedHeader = btoa(header)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    const encodedPayload = btoa(payload)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const signature = await generateSignature(
      encodedHeader + "." + encodedPayload
    );

    document.getElementById(
      "jwtToken"
    ).value = `${encodedHeader}.${encodedPayload}.${signature}`;
  });

async function generateSignature(data) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode("your-256-bit-secret"),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    keyMaterial,
    encoder.encode(data)
  );

  return arrayBufferToBase64Url(signature);
}

function arrayBufferToBase64Url(buffer) {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}