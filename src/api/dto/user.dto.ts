import { UserRole } from "../../models/user.model";

export interface IRegisterDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface ILoginDTO {
  email: string;
  password: string;
}
