export interface IUser {
  username: string;
  password: string;
  role: "admin" | "user";
  isActive: boolean;
}
