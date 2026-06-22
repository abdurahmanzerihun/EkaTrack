import { Router } from "express";
const router=Router();
import { login,registerStaff } from "../controllers/authController";
import { authenticateUser, authorizeUser } from "../middlewares/authMiddleware";
import { Role } from "../generated/prisma/enums";

router.post('/login',login);
router.post('/register-staff',authenticateUser,authorizeUser(Role.ADMIN),registerStaff);

export default router;