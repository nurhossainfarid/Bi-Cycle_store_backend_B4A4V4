import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// Application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

// Wrong route
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route not found"
  })
})

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((error: any, req: Request, res: Response) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong"
    })
  }
})

export default app
