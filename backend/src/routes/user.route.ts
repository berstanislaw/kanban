import { Router } from "express";
import {
  create,
  get,
  list,
  update,
  remove,
} from "../controllers/user.controller";
import { auth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../schemas/user.schema";

const userRoutes = Router({ mergeParams: true });

userRoutes.get("/", auth, list);
userRoutes.get("/:id", validate(getUserSchema), get);
userRoutes.post("/", validate(createUserSchema), create);
userRoutes.put("/:id", validate(updateUserSchema), update);
userRoutes.delete("/:id", validate(deleteUserSchema), remove);

export { userRoutes };
