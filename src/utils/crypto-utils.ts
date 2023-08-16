import * as crypto from "node:crypto";

type CryptoParams = {
  iv: string;
  hash: string;
};

const algorithm = "aes-128-cbc";

export function encrypt(s: string): Promise<CryptoParams> {
  return new Promise((resolve) => {
    const key = process.env.API_SECRET;
    let iv: Buffer | string = crypto.randomBytes(16);

    const cipher = crypto.createDecipheriv(
      algorithm,
      key as crypto.CipherKey,
      iv
    );

    let hash = cipher.update(s, "utf8", "hex");
    hash += cipher.final("hex");

    iv = iv.toString("base64");

    resolve({ iv, hash });
  });
}

export function decrypt(cryptoParams: CryptoParams): Promise<string> {
  return new Promise((resolve) => {
    const { iv, hash } = cryptoParams;
    const key = process.env.API_SECRET;
    const ivBuffer = Buffer.from(iv, "base64");

    const decipher = crypto.createDecipheriv(
      algorithm,
      key as crypto.CipherKey,
      ivBuffer
    );

    let string = decipher.update(hash, "hex", "utf8");
    string += decipher.final("utf8");

    resolve(string);
  });
}
