import Cryptr from "cryptr";

export function encrypt(data: string): string {
  const secret = process.env.NEXTAUTH_SECRET;
  const cryptr = new Cryptr(secret!);

  return cryptr.encrypt(data);
}

export function decrypt(data: string): string {
  const secret = process.env.NEXTAUTH_SECRET;
  const cryptr = new Cryptr(secret!);

  return cryptr.decrypt(data);
}
