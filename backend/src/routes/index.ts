import { Router } from "express";
import { userRoutes } from "./user.route";
import { projectRoutes } from "./project.route";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/projects", projectRoutes);

export { routes };
