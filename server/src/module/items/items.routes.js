import { Router } from "express";
import { saveItemController } from "./items.controller.js";
const router = Router();

router.post("/save", saveItemController);

export default router;
