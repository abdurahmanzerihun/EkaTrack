import { Router } from "express";
import { authenticateUser, authorizeUser } from "../middlewares/auth-middleware";
import { Role } from "../generated/prisma/enums";
import { validate } from "../middlewares/validation-middleware";
import { deleteProduct, getAllProducts, updateProduct } from "../controllers/product-controller";
import { updateProductSchema } from "../validations/product-validation";
const router=Router();

router.get('/',authenticateUser,authorizeUser(Role.ADMIN,Role.MANAGER,Role.STAFF),getAllProducts);
router.patch('/:productId',authenticateUser,authorizeUser(Role.ADMIN),validate(updateProductSchema),updateProduct);
router.delete('/:productId',authenticateUser,authorizeUser(Role.ADMIN),deleteProduct);
export default router;