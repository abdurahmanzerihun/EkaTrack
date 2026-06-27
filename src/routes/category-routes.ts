import { Router } from "express";
const router=Router();
import { createCategory, deleteCatagory, getCategory, updateCategory } from "../controllers/category-controller";
import { authenticateUser, authorizeUser } from "../middlewares/auth-middleware";
import { Role } from "../generated/prisma/enums";
import { validate } from "../middlewares/validation-middleware";
import { categoryParamsSchema,updateCategorySchema, createCategorySchema } from "../validations/category-validations";
import { createProductSchema } from "../validations/product-validation";
import { createProduct } from "../controllers/product-controller";

router.post('/',authenticateUser,authorizeUser(Role.ADMIN),validate(createCategorySchema),createCategory);
router.get('/',authenticateUser,authorizeUser(Role.ADMIN,Role.MANAGER,Role.STAFF),getCategory);
router.patch('/:id',authenticateUser,authorizeUser(Role.ADMIN),validate(updateCategorySchema),updateCategory);
router.delete('/:id',authenticateUser,authorizeUser(Role.ADMIN),validate(categoryParamsSchema),deleteCatagory);
//A route for creating products for specific category
router.post('/:categoryId/products',authenticateUser,authorizeUser(Role.ADMIN),validate(createProductSchema),createProduct);

export default router;