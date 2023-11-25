import { Request, Response } from "express";
import { AuthRequest } from "../../auth/auth.types";
import { User } from "@prisma/client";
import {
  createOrder,
  getAllOrders,
  sumProducts,
  getOrdersByUser
} from "./order.service";

export const createOrderHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { id, email, name } = req.user as User;
    const { products } = req.body;

    const orderTotal = await sumProducts(products);

    const order = {
      user_id: id,
      customer_name: name,
      customer_email: email,
      order_total: orderTotal,
      products,
    }

    const orderCreated = await createOrder(order);

    res.status(200).json({ message: 'Order created successfully', orderCreated });
  } catch (error: any) {

    res.status(400).json({
      error: error.message,
      message: 'Authentication required'
    });
  }
}

export const getAllOrdersHandler = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();

    res.status(200).json({
      message: 'Success',
      data: {
        orders
      }
    });
  } catch (error: any) {

    res.status(400).json({ error: error.message });
  }
}

export const getOrdersByUserHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.user as User;

    const orders = await getOrdersByUser(id);

    res.status(200).json({
      message: 'Success',
      data: {
        orders
      }
    });
  } catch (error: any) {

    res.status(400).json({ error: error.message });
  }
}