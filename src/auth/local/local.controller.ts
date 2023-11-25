import { Request, Response } from "express";
import { getUserByEmail } from "../../api/user/user.service";
import { comparePassword } from "../utils/bycrypt";
import { createAuthResponse } from "./local.service";

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const isMatch = await comparePassword(password, user.password)

    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    // The error is here
    const { token, profile } = createAuthResponse(user);

    res.status(200).json({ message: "User logged successfully", token, profile })
  } catch (error: any) {

    res.status(400).json({ error: error.message });
  }
}