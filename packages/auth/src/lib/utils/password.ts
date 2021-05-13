import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export default class Password {
  static async toHash(password: string): Promise<string>{
    const salt = randomBytes(8).toString('hex');
    const buff = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buff.toString('hex')}.${salt}`
  }
  static async compare(storedPassword: string, providedPassword: string): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buff = (await scryptAsync(providedPassword, salt, 64)) as Buffer;

    return buff.toString('hex') === hashedPassword;
  }

}