import { getCollection } from "@/db/db";
import logger from "@/logger";
import { dishParms, IObject } from "@/types";
import { ObjectId } from "mongodb";

/**
 * @description dishService
 * @author Shakthi NR
 */
export const dishService = {
  /**
   *
   * @param data {dishParms} - params used to filter dishes
   * @returns the filtered dishes based on params
   */
  getDishes: async (data: dishParms) => {
    logger.info("dishService | getDishes");
    const dishes = getCollection("dishes");
    const limit = data.limit;
    const skip = data.skip;

    const diet = data.diet ? data.diet : "";
    const state = data.state ? data.state : "";
    const region = data.region ? data.region : "";
    const flavor = data.flavor ? data.flavor : "";
    const ingredients = data.ingredients ? data.ingredients.split(",") : "";

    const searchText = data.searchText ? data.searchText : "";

    let findQuery: IObject = {};

    if (diet) {
      findQuery["diet"] = diet;
    }
    if (state) {
      findQuery["state"] = { $regex: state, $options: "i" };
    }
    if (region) {
      findQuery["region"] = { $regex: region, $options: "i" };
    }
    if (flavor) {
      findQuery["flavor_profile"] = { $regex: flavor, $options: "i" };
    }

    if (ingredients) {
      // findQuery["ingredients"] = { $all: ingredients };
      findQuery["ingredients"] = {
        $not: { $elemMatch: { $nin: ingredients } },
      };
    }

    if (searchText) {
      let suggestionQuery = [
        { name: { $regex: searchText, $options: "i" } },
        { ingredients: { $elemMatch: { $regex: searchText, $options: "i" } } },
        { state: { $regex: searchText, $options: "i" } },
        { region: { $regex: searchText, $options: "i" } },
      ];
      if (Object.keys(findQuery).length) {
        findQuery = {
          ...findQuery,
          $or: suggestionQuery,
        };
      } else {
        findQuery = {
          $or: suggestionQuery,
        };
      }
    }

    let sortQuery: IObject = {};
    sortQuery[data.orderBy] = data.sortBy === "asc" ? 1 : -1;
    const response = await dishes
      .find(findQuery, { limit, skip })
      .sort(sortQuery)
      .toArray();

    const total = await dishes.countDocuments(findQuery);
    return { data: response, total, limit, skip };
  },
  /**
   *
   * @param id {string} - id of the dish
   * @returns the dish with the given id
   */
  getDish: async (id: string) => {
    logger.info("dishService | getDish");
    const dishes = getCollection("dishes");
    const response = await dishes.findOne({ _id: new ObjectId(id) });
    return response;
  },
  /**
   * Fn used to get filter option for given option
   * @param option {string} - option to filter
   * @returns the filter options for the given option
   */
  getFilterOptions: async (option: string) => {
    logger.info("dishService | getFilterOptions");
    const dishes = getCollection("dishes");
    option = option === "flavor" ? "flavor_profile" : option;
    const response = await dishes
      .aggregate([
        {
          $match: {
            [option]: { $ne: null },
          },
        },
        {
          $group: {
            _id: null,
            data: {
              $addToSet: `$${option}`,
            },
          },
        },
      ])
      .toArray();
    return response[0]?.data?.sort() || [];
  },
};

export default dishService;
