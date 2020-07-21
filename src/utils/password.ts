import bcrypt from 'bcrypt';

export class Password {
  static async encryptPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  static async comparePaswword(password: string, inputPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(password, inputPassword);
    return Boolean(match);
  }
}
