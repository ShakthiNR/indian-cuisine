import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../logger";

/**
 * @description healthCheck
 * @author Shakthi NR
 */
export const healthCheck = (req: Request, res: Response) => {
  logger.info("Health check endpoint is called");

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    message: "Service is running",
  });
};
