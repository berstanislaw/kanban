import { Router } from "express";
import {
  create,
  get,
  list,
  softDelete,
  update,
} from "../controllers/user.controller";

const userRoutes = Router({ mergeParams: true });

userRoutes.get("/", list);
userRoutes.get("/:id", get);
userRoutes.post("/", create);
userRoutes.put("/:id", update);
userRoutes.delete("/:id", softDelete);

export { userRoutes };
