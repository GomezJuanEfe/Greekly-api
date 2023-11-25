import { Orders as OrdersModel } from "@prisma/client";

export type Orders = OrdersModel;

export type OrderData = Omit<OrdersModel, 'id' | 'payment_id' | 'order_date' | 'order_status'> & { products: string[] }