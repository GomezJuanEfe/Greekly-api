import { Request, Response } from "express";
import { AuthRequest } from "../../auth/auth.types";
import { User } from "@prisma/client";
import {
  createOrder,
  getAllOrders,
  sumProducts,
  getOrdersByUser,
  getOrderById
} from "./order.service";

export const createOrderHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { id, email, name } = req.user as User;
    const { products, paymentId, order_status } = req.body;
    console.log(req.body)

    if (products.length === 0) {
      throw new Error('No products in the order');
    }

    const orderTotal = await sumProducts(products);

    const order = {
      user_id: id,
      customer_name: name,
      customer_email: email,
      order_total: orderTotal,
      products,
      payment_id: paymentId,
      order_status
    }

    const orderCreated = await createOrder(order);

    res.status(200).json({ message: 'Order created successfully', orderCreated });
  } catch (error: any) {

    res.status(400).json({
      error: 'Error on the order creation',
      message: error.message,
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

export const getOrderByIdHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.user as User;
    const { productId } = req.params;

    const order = await getOrderById(id, productId);

    res.status(200).json({
      message: 'Success',
      data: {
        order
      }
    });
  } catch (error: any) {

    res.status(400).json({ error: error.message });
  }
}