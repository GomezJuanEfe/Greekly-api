import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {

    res.status(200).json({ message: "Get all users" });
  } catch (error: any) {

    res.status(400).json({ error: error.message });
  }
}