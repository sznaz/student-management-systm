import { Schema, model, Document } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
}

export interface IUserModel extends Document {
  name: string;
  email: string;
  department?: string;
  password: string;
  role: UserRole;
}

const schema = new Schema<IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    department: String,
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(UserRole), required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete (ret as { password?: string }).password;
        return ret;
      },
    },
  }
);

export default model<IUserModel>("User", schema);
