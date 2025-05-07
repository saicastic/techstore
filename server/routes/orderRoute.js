import express from "express";

import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe,
} from "../controllers/orderContoller.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authSeller, getAllOrders);

export default orderRouter;
