import { Router } from "express";
import { userRoutes } from "./user.route";
import { projectRoutes } from "./project.route";
import { taskRoutes } from "./taks.route";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/projects", projectRoutes);
routes.use("/projects/:projectId/tasks", taskRoutes);

export { routes };
