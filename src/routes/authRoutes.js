import { Router } from "express";
import { getMe, login, register } from "../controllers/authControllers.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", protect, getMe);


export default router;
