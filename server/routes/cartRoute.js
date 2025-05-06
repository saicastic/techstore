import express from "express";
import { updateCart } from "../controllers/cartController";
import authUser from "../middlewares/authUser";

const cartRouter = express.Router();

cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
