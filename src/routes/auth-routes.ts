import { Router } from "express";
const router=Router();
import { login,registerStaff } from "../controllers/auth-controller";
import { authenticateUser, authorizeUser } from "../middlewares/auth-middleware";
import { Role } from "../generated/prisma/enums";

router.post('/login',login);
router.post('/register-staff',authenticateUser,authorizeUser(Role.ADMIN),registerStaff);

export default router;