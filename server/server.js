import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

// DB & Cloudinary
await connectDB();
await connectCloudinary();

// ✅ Stripe webhook FIRST
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// ✅ CORS FIRST
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [])
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Normal middleware AFTER
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => res.send("API is working"));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




















// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import connectDB from './configs/db.js';
// import 'dotenv/config';
// import userRouter from './routes/userRoute.js';
// import sellerRouter from './routes/sellerRoute.js';
// import connectCloudinary from './configs/cloudinary.js';
// import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import addressRouter from './routes/addressRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import { stripeWebhooks } from './controllers/orderController.js';

// const app=express();
// const port=process.env.PORT || 4000;

// await connectDB()
// await connectCloudinary()

// //Allow multiple origins
// const allowedOrigins =['http://localhost:5173']

// app.post('/stripe', express.raw({type : 'application/json'}),stripeWebhooks)

// //Middleware configuration
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({origin: allowedOrigins, credentials: true}));

// app.get('/', (req, res) => res.send("API is working"));
// app.use('/api/user',userRouter)
// app.use('/api/seller',sellerRouter)
// app.use('/api/product',productRouter)
// app.use('/api/cart',cartRouter)
// app.use('/api/address',addressRouter)
// app.use('/api/order',orderRouter)

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`)
// })