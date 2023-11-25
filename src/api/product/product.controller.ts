import { Request, Response } from "express";
import { AuthRequest } from "../../auth/auth.types";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from "./product.service";

export const getAllProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      message: 'Success',
      data: {
        products
      }
    });
  } catch (error: any) {

    res.status(400).json({ error: error.message });
  }
}

export const createProductHandler = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };

    const productCreated = await createProduct(data);

    res.status(201).json({
      message: 'Product created successfully',
      data: {
        productCreated
      }
    })
  } catch (error: any) {

    res.status(400).json({ error: error.message });
  }
}

export const updateProductHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    const updatedProduct = await updateProduct(req.body);

    res.status(200).json({
      message: 'Product updated successfully',
      data: {
        updatedProduct
      }
    })
  } catch (error: any) {

    res.status(400).json({ error: error.message });
  }
}

export const deleteProductHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    const deletedProduct = await deleteProduct(id);

    res.status(200).json({
      message: 'Product deleted successfully',
      data: {
        deletedProduct
      }
    });
  } catch (error: any) {

    res.status(400).json({ error: error.message })
  }
}