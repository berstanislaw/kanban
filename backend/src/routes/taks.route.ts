import { Router } from "express";
import {
  list,
  get,
  create,
  update,
  remove,
} from "../controllers/task.controller";
import { validate } from "../middlewares/validate";
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  listTaskSchema,
  updateTaskSchema,
} from "../schemas/task.schema";

const taskRoutes = Router({ mergeParams: true });

taskRoutes.get("/", validate(listTaskSchema), list);
taskRoutes.get("/:id", validate(getTaskSchema), get);
taskRoutes.post("/", validate(createTaskSchema), create);
taskRoutes.put("/:id", validate(updateTaskSchema), update);
taskRoutes.delete("/:id", validate(deleteTaskSchema), remove);

export { taskRoutes };
