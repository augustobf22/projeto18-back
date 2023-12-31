import { Router } from "express";
import { listUserModels, updateModel, deleteModel, getHistory } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/user/:id", listUserModels);
usersRouter.put("/user/:id/:modelId", updateModel);
usersRouter.delete("/user/:id/:modelId", deleteModel);

export default usersRouter;
