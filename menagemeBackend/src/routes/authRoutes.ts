import { Router } from "express";
import {
  register,
  login,
  logout,
  refreshToken,
  getCurrentUser,
} from "../controllers/authController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/me", authenticateJWT, getCurrentUser);

export default router;
