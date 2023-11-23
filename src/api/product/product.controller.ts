import { Request, Response } from "express";

export const getAllProducts = (req: Request, res: Response) => {
  try {

    res.status(200).json({ message: 'All Products' });
  } catch (error: any) {

    res.status(400).json({ error: error.message });
  }
}