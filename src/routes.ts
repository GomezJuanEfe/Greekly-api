import { Application } from 'express';

import healthcheckRouter from './api/healthcheck';
import orderRouter from './api/order'
import productRouter from './api/product';
import userRouter from './api/user';
import authLocalRouter from './auth/local';
import paymentRouter from './api/checkout';

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter)
  app.use('/api/order', orderRouter)
  app.use('/api/product', productRouter)
  app.use('/api/user', userRouter)
  app.use('/api/checkout', paymentRouter)
  app.use('/auth/local', authLocalRouter)
}

export default routes