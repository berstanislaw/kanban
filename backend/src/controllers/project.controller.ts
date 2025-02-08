import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import {
  createProject,
  deleteProject,
  getProject,
  listProject,
  updateProject,
} from "../services/project.service";

const list = catchAsync(
  async (
    req: Request<{}, {}, {}, { name?: string; status: string }>,
    res: Response
  ) => {
    const { status, name } = req.query;
    const projects = await listProject({ name, status });

    res.send(projects);
  }
);

const get = catchAsync(
  async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const { id } = req.params;
    const project = await getProject(id);

    res.send(project);
  }
);

const create = catchAsync(
  async (
    req: Request<
      {},
      {},
      { name: string; description: string; status: string; managerId: string }
    >,
    res: Response
  ) => {
    const project = await createProject(req.body);

    res.send(project);
  }
);

const update = catchAsync(
  async (
    req: Request<
      { id: string },
      {},
      {
        name?: string;
        description?: string;
        status?: string;
        managerId?: string;
      }
    >,
    res: Response
  ) => {
    const { id } = req.params;
    const project = await updateProject(id, req.body);

    res.send(project);
  }
);

const remove = catchAsync(
  async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const { id } = req.params;
    await deleteProject(id);

    res.send({ message: "Project deleted" });
  }
);

export { list, get, create, update, remove };
