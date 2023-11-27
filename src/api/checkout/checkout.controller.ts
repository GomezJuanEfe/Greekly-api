import { Request, Response } from 'express';
import Stripe from 'stripe';
// import { createPayment } from './payment.service';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(STRIPE_SECRET_KEY)

const redirectUrl = process.env.FRONTED_URL as string;

export const handleCheckout = async (req: Request, res: Response) => {
  const { paymentMethod, amount } = req.body

  try {
    const { id } = paymentMethod
    const payment = await stripe.paymentIntents.create({
      payment_method: id,
      amount,
      currency: 'usd',
      confirm: true,
      description: 'Purchease on Greekly e-commerce',
      return_url: `${redirectUrl}`,
      payment_method_types: [
        "card"
      ],
    })

    res.status(201).json({ message: 'Payment successful', payment })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const handleCreatePayment = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    // const payment = await createPayment(data) || null;
    const payment = ''

    res.status(202).json({ message: 'Payment created successfully', payment });
  } catch ({ message }: any) {
    res.status(400).json({ message })
  }
}