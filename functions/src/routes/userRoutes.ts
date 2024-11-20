import {Router} from "express";
import {userController} from "../controllers/userController";
import {authenticateUser} from "../middleware/auth";
import {validateRequest} from "../middleware/validator";
import {userSchema} from "../utils/validation";

const router = Router();

router.post("/register", validateRequest(userSchema), userController.register);
router.put("/update", authenticateUser, validateRequest(userSchema), userController.updateUser);
router.delete("/delete", authenticateUser, userController.deleteUser);

export default router;

