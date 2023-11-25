import { Response, NextFunction } from "express";
import { verifyToken } from "./auth.service";
import { getUserByEmail } from "../api/user/user.service";
import { User } from "@prisma/client";
import { AuthRequest } from "./auth.types";


export const isAuthenticated = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await getUserByEmail(decoded.email) as User;

    req.user = user;

    return next();
  } catch (error: any) {

    res.status(400).json({ error: error.message })
  }
}

export const hasRole = (rolesAllowed: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { role } = req.user as User;

      const isAllowed = rolesAllowed.includes(role);

      if (!isAllowed) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      return next();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}