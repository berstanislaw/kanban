import { Router } from "express";
import {
  list,
  get,
  create,
  update,
  remove,
} from "../controllers/task.controller";

const taskRoutes = Router({ mergeParams: true });

taskRoutes.get("/", list);
taskRoutes.get("/:id", get);
taskRoutes.post("/", create);
taskRoutes.put("/:id", update);
taskRoutes.delete("/:id", remove);

export { taskRoutes };
