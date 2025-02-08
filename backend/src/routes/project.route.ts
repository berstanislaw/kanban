import { Router } from "express";
import {
  create,
  get,
  list,
  update,
  remove,
} from "../controllers/project.controller";
import { validate } from "../middlewares/validate";
import {
  createProjectSchema,
  deleteProjectSchema,
  getProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema";
import { auth } from "../middlewares/auth";

const projectRoutes = Router({ mergeParams: true });

projectRoutes.get("/", auth, list);
projectRoutes.get("/:id", auth, validate(getProjectSchema), get);
projectRoutes.post("/", auth, validate(createProjectSchema), create);
projectRoutes.put("/:id", auth, validate(updateProjectSchema), update);
projectRoutes.delete("/:id", auth, validate(deleteProjectSchema), remove);

export { projectRoutes };
