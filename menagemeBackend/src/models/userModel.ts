import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  surname: string;
  role: "admin" | "devops" | "developer" | "guest";
  login: string;
  password: string;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
  surname: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "devops", "developer", "guest"],
  },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
