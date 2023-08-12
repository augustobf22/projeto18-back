import { Router } from "express";
import { getModels, getModelDetails, postModel } from "../controllers/models.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { schemaModel } from "../schemas/model.schema.js";

const modelsRouter = Router();

modelsRouter.get("/home", getModels);
modelsRouter.get("/model/:id", getModelDetails);
modelsRouter.post("/model/:id", validateSchema(schemaModel), postModel);

export default modelsRouter;