import { AES, enc } from "crypto-js";
// import env from "~/utils/env";

type EncryptionArgs = {
  action: "encrypt" | "decrypt";
  data: string;
};

export const encryptionHandler = (args: EncryptionArgs) => {
  const { action, data } = args;
  const key = "jdksjadsjkdwiejwejo";
  if (action === "encrypt") {
    return AES.encrypt(data, key).toString();
  }

  try {
    return AES.decrypt(data, key).toString(enc.Utf8);
  } catch (error) {
    throw new Error("Decryption failed due to malformed data or key mismatch.");
  }
};
