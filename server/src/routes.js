import { Router } from "express";
const router = Router();

import itemsRoutes from "./module/items/items.routes.js";
import userRoutes from "./module/user/user.routes.js";

router.use("/items", itemsRoutes);
router.use("/user", userRoutes);

export default router;
