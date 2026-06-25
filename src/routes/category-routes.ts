import { Router } from "express";
const router=Router();
import { createCategory, deleteCatagory, getCategory, updateCategory } from "../controllers/category-controller";
import { authenticateUser, authorizeUser } from "../middlewares/auth-middleware";
import { Role } from "../generated/prisma/enums";

router.post('/',authenticateUser,authorizeUser(Role.ADMIN),createCategory);
router.get('/',authenticateUser,authorizeUser(Role.ADMIN,Role.MANAGER,Role.STAFF),getCategory);
router.patch('/:id',authenticateUser,authorizeUser(Role.ADMIN),updateCategory);
router.delete('/:id',authenticateUser,authorizeUser(Role.ADMIN),deleteCatagory);
export default router;