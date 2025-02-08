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

const projectRoutes = Router({ mergeParams: true });

projectRoutes.get("/", list);
projectRoutes.get("/:id", validate(getProjectSchema), get);
projectRoutes.post("/", validate(createProjectSchema), create);
projectRoutes.put("/:id", validate(updateProjectSchema), update);
projectRoutes.delete("/:id", validate(deleteProjectSchema), remove);

export { projectRoutes };
