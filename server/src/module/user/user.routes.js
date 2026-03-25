import { Router } from "express";
import {
  registerUser,
  verifyAuthController,
  loginUser,
} from "./auth.controller.js";
import { verifyAuth } from "../../common/middleware/verifyAuth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/verify", verifyAuth, verifyAuthController);
router.post("/login", loginUser);

export default router;
