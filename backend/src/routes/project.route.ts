import { Router } from "express";
import {
  create,
  get,
  list,
  update,
  softDelete,
} from "../controllers/project.controller";

const projectRoutes = Router({ mergeParams: true });

projectRoutes.get("/", list);
projectRoutes.get("/:id", get);
projectRoutes.post("/", create);
projectRoutes.put("/:id", update);
projectRoutes.delete("/:id", softDelete);

export { projectRoutes };
