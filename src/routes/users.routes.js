import { Router } from "express";
import { listUserModels, getHistory } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/user/:id", listUserModels);
usersRouter.get("/user/:id/history", getHistory);
//add transaction
export default usersRouter;
