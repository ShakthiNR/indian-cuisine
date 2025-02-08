import express from "express";
import { dishRoutes, healthRoutes } from "@/routers";
import { PORT } from "@/secrets";
import cors from 'cors'
import { errorHandler } from "@/middlewares";
import logger from "./logger";
import { connectDB } from "@/db";

const app = express();

app.use(cors());

app.use("/", healthRoutes);
app.use("/api/v1", dishRoutes);

app.use(errorHandler)

app.listen(PORT, async() => {
  logger.info(`Server is running on ${PORT}`);
   await connectDB();
});
