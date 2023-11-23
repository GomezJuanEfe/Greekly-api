import { Request, Response } from "express";

export const getAllOrders = (req: Request, res: Response) => {
  try {

    res.status(200).json({ message: 'All Orders' });
  } catch (error: any) {

    res.status(400).json({ error: error.message });
  }
}