import { Router } from "express";
import {
  create,
  get,
  list,
  update,
  remove,
} from "../controllers/user.controller";

const userRoutes = Router({ mergeParams: true });

userRoutes.get("/", list);
userRoutes.get("/:id", get);
userRoutes.post("/", create);
userRoutes.put("/:id", update);
userRoutes.delete("/:id", remove);

export { userRoutes };
