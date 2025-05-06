import express from "express";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
} from "../controllers/OrderContoller.js";
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/user", authUser, getUserOrders);
orderRouter.post("/seller", authSeller, getAllOrders);

export default orderRouter;
