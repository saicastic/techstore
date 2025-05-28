import express from "express";
import { scrapeImages } from "../controllers/scrapeContoller.js";
import { protect } from "../middlewares/authMiddleware.js";
const scrapeRouter = express.Router();

scrapeRouter.post("/", scrapeImages);

export default scrapeRouter;
