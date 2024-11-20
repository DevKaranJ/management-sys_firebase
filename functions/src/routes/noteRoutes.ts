import {Router} from "express";
import {noteController} from "../controllers/noteController";
import {authenticateUser} from "../middleware/auth";
import {validateRequest} from "../middleware/validator";
import {noteSchema} from "../utils/validation";

const router = Router();

router.post("/", authenticateUser, validateRequest(noteSchema), noteController.createNote);
router.get("/", authenticateUser, noteController.getNotes);

export default router;
