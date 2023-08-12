import { Router } from "express";
import usersRouter from "./users.routes.js";
import modelsRouter from "./models.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(modelsRouter);

export default router;