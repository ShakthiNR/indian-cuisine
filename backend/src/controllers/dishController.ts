import logger from "@/logger";
import { dishService } from "@/services";
import { dishParms } from "@/types";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * @description dishController
 * @author Shakthi NR
 */
export const dishController = {
  getDishes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const orderBy = req.query.orderBy
        ? (req.query.orderBy as string)
        : "name";
      const sortBy = req.query.sortBy ? (req.query.sortBy as string) : "asc";

      const diet = req.query.diet ? (req.query.diet as string) : "";
      const state = req.query.state ? (req.query.state as string) : "";
      const region = req.query.region ? (req.query.region as string) : "";
      const flavor = req.query.flavor ? (req.query.flavor as string) : "";

      const searchText = (req.query.searchText as string) || "";

      const params: dishParms = {
        skip,
        limit,
        orderBy,
        sortBy,
        diet: diet?.toLowerCase(),
        state: state?.toLowerCase(),
        region: region?.toLowerCase(),
        flavor: flavor?.toLowerCase(),
        searchText: searchText?.toLowerCase(),
      };

      logger.info("dishController | getDishes");
      logger.info(`parms: ${JSON.stringify(params)}`);

      const response = await dishService.getDishes(params);
      return res.status(StatusCodes.OK).json({
        status: "success",
        ...response,
      });
    } catch (error) {
      logger.error("dishController | getDishes | Error: ");
      logger.error(error);
      next(error);
    }
  },
  getDish: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      logger.info("dishController | getDish");
      logger.info(`id: ${id}`);
      const response = await dishService.getDish(id);
      return res.status(StatusCodes.OK).json({
        status: "success",
        data: response,
      });
    } catch (error) {
      logger.error("dishController | getDish | Error: ");
      logger.error(error);
      next(error);
    }
  },
  getFilterOptions: async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("dishController | getFilterOptions");
      const option = req.query.option as string;
      logger.info(`option: ${option}`);

      if (!option) {
        logger.error(
          "dishController | getFilterOptions | Error: option is required"
        );
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: "option is required",
        });
      }

      const response = await dishService.getFilterOptions(
        option?.toLowerCase()
      );
      return res.status(StatusCodes.OK).json({
        status: "success",
        data: response,
      });
    } catch (error) {
      logger.error("dishController | getFilterOptions | Error: ");
      logger.error(error);
      next(error);
    }
  },
};
