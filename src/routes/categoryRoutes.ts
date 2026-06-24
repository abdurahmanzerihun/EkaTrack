import { Router } from "express";
const router=Router();
import { createCategory, deleteCatagory, getCategory, updateCategory } from "../controllers/categoryController";
import { authenticateUser, authorizeUser } from "../middlewares/authMiddleware";
import { Role } from "../generated/prisma/enums";

router.post('/',authenticateUser,authorizeUser(Role.ADMIN),createCategory);
router.get('/',authenticateUser,authorizeUser(Role.ADMIN,Role.MANAGER,Role.STAFF),getCategory);
router.patch('/:id',authenticateUser,authorizeUser(Role.ADMIN),updateCategory);
router.delete('/:id',authenticateUser,authorizeUser(Role.ADMIN),deleteCatagory);
export default router;