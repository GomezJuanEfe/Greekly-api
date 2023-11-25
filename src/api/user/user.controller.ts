import { Request, Response } from "express";
import { createUser } from "./user.service";
import { createAuthResponse } from "../../auth/local/local.service";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const user = await createUser(data);

    const { token, profile } = createAuthResponse(user);

    res.status(201).json({ message: "User created successfully", profile, token });
  } catch (error: any) {

    res.status(400).json({ error: error.message });
  }
}
