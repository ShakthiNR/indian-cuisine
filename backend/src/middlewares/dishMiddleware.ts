import logger from "@/logger";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";

/**
 * @description dishMiddleware
 * @author Shakthi NR
 */
export const dishMiddleware = {
    isValidId: ( req:Request, res:Response, next:NextFunction ) => {
        logger.info("dishMiddleware | isValidId");
        const id = req.params.id;
        if(!id || !ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: StatusCodes.BAD_REQUEST,
                message: "Invalid id"
            });
        }
        next();
     }
}
