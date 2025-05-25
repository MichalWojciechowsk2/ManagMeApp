import { Request, Response } from "express";
import UserModel from "../models/userModel";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const { name, surname, role } = req.body;
//     const newUser = new UserModel({ name, surname, role });
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to create user" });
//   }
// };
