import { Router } from "express";
import { saveItemController } from "./items.controller.js";
import { verifyAuth } from "../../common/middleware/verifyAuth.js";
const router = Router();

router.post("/save", verifyAuth, saveItemController);

export default router;
