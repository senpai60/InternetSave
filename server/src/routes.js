import { Router } from "express";
const router = Router();

import itemsRoutes from "./module/items/items.routes.js";

router.use("/items", itemsRoutes);

export default router;
