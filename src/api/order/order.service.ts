import { PrismaClient } from "@prisma/client";

import { Orders } from "@prisma/client";
import { OrderData } from "./order.types";

const prisma = new PrismaClient();

export const sumProducts = async (input: string[]) => {
  try {
    const products = await prisma.products.findMany({
      where: {
        id: {
          in: input,
        },
      },
      select: {
        price: true,
      },
    });

    return products.reduce((acc, cur) => acc + cur.price, 0);
  } catch (error: any) {
    throw error
  }
}

export const createOrder = async (input: OrderData) => {
  try {
    const order = await prisma.orders.create({
      data: {
        ...input,
        products: {
          connect: input.products.map((product) => ({ id: product }))
        }
      }
    });

    return order;
  } catch (error: any) {
    throw error
  }
}

export const getAllOrders = async () => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        products: true
      }
    })

    return orders
  } catch (error: any) {
    throw error
  }
}

export const getOrdersByUser = async (id: string) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        user_id: id
      },
      include: {
        products: true
      }
    });

    return orders
  } catch (error: any) {
    throw error
  }
}

export const getOrderById = async (id: string, productId: string) => {
  try {
    const orders = await prisma.orders.findUnique({
      where: {
        user_id: id,
        id: productId
      },
      include: {
        products: true
      }
    });

    return orders
  } catch (error: any) {
    throw error
  }
}