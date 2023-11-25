import { PrismaClient } from "@prisma/client";

import { Products } from "./product.types";

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  try {
    const products = await prisma.products.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        image: true,
        category: true,
      }
    });

    return products;
  } catch (error: any) {

    throw error;
  }
}

export const createProduct = async (input: Products) => {
  try {

    const product = await prisma.products.create({
      data: input
    });

    return product;
  } catch (error: any) {
    throw error;
  }
}

export const getProductById = async (id: string) => {
  try {
    const product = prisma.products.findUnique({
      where: {
        id,
      }
    });
    return product;
  } catch (error: any) {
    throw error;
  }
}

export const updateProduct = async (input: Products) => {
  try {
    const product = await prisma.products.update({
      where: {
        id: input.id
      },
      data: input
    });

    return product;
  } catch (error: any) {
    throw error;
  }
}

export const deleteProduct = async (id: string) => {
  try {
    const product = prisma.products.delete({
      where: {
        id,
      }
    });

    return product;
  } catch (error: any) {
    throw error;
  }
}