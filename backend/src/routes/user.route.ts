import { Router } from "express";
import { create, get, list } from "../controllers/user.controller";

const userRoutes = Router({ mergeParams: true });

userRoutes.get("/", list);
userRoutes.get("/:id", get);
userRoutes.post("/", create);

export { userRoutes };
