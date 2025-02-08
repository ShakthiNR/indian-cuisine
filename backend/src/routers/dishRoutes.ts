import { Router } from "express";
import { dishController } from "@/controllers";
import { dishMiddleware } from "@/middlewares";

const router = Router();

router.get("/dishes", dishController.getDishes);
router.get("/dishes/filter-options", dishController.getFilterOptions);
router.get("/dish/:id", dishMiddleware.isValidId, dishController.getDish);

export default router;
