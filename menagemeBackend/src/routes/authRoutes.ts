import express from "express";
import { Router } from "express";
import {
  register,
  login,
  logout,
  refreshToken,
  getCurrentUser,
} from "../controllers/authController";
import { authenticateJWT } from "../middleware/authMiddleware";
import "../auth/googleStrategy";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();
// const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/me", authenticateJWT, getCurrentUser);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const user = req.user as any;
    if (!user) return res.redirect("http://localhost:3000/login?error=NoUser");
    const token = jwt.sign(
      { userId: user._id, role: user.role }, //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
  }
);

export default router;
