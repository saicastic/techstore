import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connection from "./configs/database.js";
import userRouter from "./routes/userRouter.js";
import scrapeRouter from "./routes/scrapeRouter.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import "dotenv/config";

const app = express();

const allowedOrigins = [
  "https://techstore-frontend-pi.vercel.app/",
  "http://localhost:5173",
];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
connection();
// Routes
app.use("/api/users", userRouter);
app.use("/api/scrape", scrapeRouter);

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
