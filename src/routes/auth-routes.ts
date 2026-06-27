import { Router } from "express";
const router=Router();
import { login,registerStaff } from "../controllers/auth-controller";
import { authenticateUser, authorizeUser } from "../middlewares/auth-middleware";
import { Role } from "../generated/prisma/enums";
import { validate } from "../middlewares/validation-middleware";
import { loginSchema, registerStaffSchema } from "../validations/auth-validation";

router.post('/login',validate(loginSchema),login);
router.post('/register-staff',authenticateUser,authorizeUser(Role.ADMIN),validate(registerStaffSchema),registerStaff);

export default router;