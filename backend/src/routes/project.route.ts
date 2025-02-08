import { Router } from "express";
import {
  create,
  get,
  list,
  update,
  remove,
} from "../controllers/project.controller";

const projectRoutes = Router({ mergeParams: true });

projectRoutes.get("/", list);
projectRoutes.get("/:id", get);
projectRoutes.post("/", create);
projectRoutes.put("/:id", update);
projectRoutes.delete("/:id", remove);

export { projectRoutes };
