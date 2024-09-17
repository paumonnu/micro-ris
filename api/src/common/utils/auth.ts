import * as bcrypt from 'bcrypt';

export async function hashUserPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password || this.password, salt);
}

export async function compareHash(
  password: string,
  hash: string,
): Promise<string> {
  return await bcrypt.compare(password, hash);
}
