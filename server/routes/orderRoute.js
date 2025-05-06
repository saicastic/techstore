import express from "express";
import { placeOrderCOD } from "../controllers/OrderContoller.js";

const orderRouter = express.Router();

orderRouter.post("/cod", placeOrderCOD);

export default orderRouter;
