import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import User from "./models/User.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/adressRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// Allow multiple origins

const allowedOrigins = ["http://localhost:5173"];

//Middle Ware Configuration

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// const addMissingNicknames = async () => {
//   await connectDB();
//   await User.updateMany(
//     { nickname: { $exists: false } }, // only those who don't have nickname
//     { $set: { nickname: "" } } // add default nickname
//   );
//   console.log("All old users updated with default nickname.");
//   process.exit();
// };

// addMissingNicknames();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
