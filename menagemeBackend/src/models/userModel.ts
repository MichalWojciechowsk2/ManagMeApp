import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  googleId?: string;
  name: string;
  surname: string;
  role: "admin" | "devops" | "developer" | "guest";
  login: string;
  password?: string;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>({
  googleId: {
    type: String,
    required: function (this: IUser) {
      return !this.password;
    },
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  surname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "devops", "developer", "guest"],
    default: "guest",
  },
  login: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function (this: IUser) {
      return !this.googleId;
    },
  },
  refreshToken: {
    type: String,
  },
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
