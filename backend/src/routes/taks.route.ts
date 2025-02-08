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
import { auth } from "../middlewares/auth";

const taskRoutes = Router({ mergeParams: true });

taskRoutes.get("/", auth, validate(listTaskSchema), list);
taskRoutes.get("/:id", auth, validate(getTaskSchema), get);
taskRoutes.post("/", auth, validate(createTaskSchema), create);
taskRoutes.put("/:id", auth, validate(updateTaskSchema), update);
taskRoutes.delete("/:id", auth, validate(deleteTaskSchema), remove);

export { taskRoutes };
