export interface IUser {
  name: string;
  email: string;
  password: string;
  comparePassword(userPass: string, hashedPass: string): Promise<boolean>;
}
