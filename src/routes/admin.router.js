import express from 'express';
import { loginAdmin, refreshToken, registerAdmin } from "../controllers/admin.controller.js"; 
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
const router = express.Router();

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.get("/refresh", requireRefreshToken, refreshToken);

export default router;