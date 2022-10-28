import axios from "axios";
import config from "./config";

let authHeader = null;

export async function auth(address, signature) {
  const result = await axios.post(`${config.api}/api/auth`, {
    address: `academy-${address}`,
    signature: signature
  });
  if (result.data.isValid) {
    authHeader = getHeader(address, signature);
  }
  return result.data;
}

export async function logout() {
  authHeader = null;
}

function getHeader(address, signature) {
  const authHeaderRaw = `academy-${address}:${signature}`;
  return Buffer.from(authHeaderRaw).toString("base64");
}

export async function get(path) {
  if (!authHeader) {
    return;
  }
  const result = await axios.get(`${config.api}/api${path}`, {
    headers: {
      authorization: `Basic ${authHeader}`
    }
  });
  return result.data.result;
}
