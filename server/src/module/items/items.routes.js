import { Router } from "express";
import { saveItemController, getItemsController } from "./items.controller.js";
import { verifyAuth } from "../../common/middleware/verifyAuth.js";
const router = Router();

router.post("/save", verifyAuth, saveItemController);
router.get("/get-saved", verifyAuth, getItemsController);

export default router;
