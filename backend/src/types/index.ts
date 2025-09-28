export interface IUser {
  _id: string;
  username: string;
  password: string;
  role: "admin" | "user";
  isActive: boolean;
}
