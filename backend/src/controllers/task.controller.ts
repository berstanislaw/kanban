import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import {
  createTask,
  deleteTask,
  getTask,
  listTask,
  updateTask,
} from "../services/task.service";

const list = catchAsync(
  async (req: Request<{ projectId: string }>, res: Response) => {
    const { projectId } = req.params;

    const tasks = await listTask(projectId);

    res.json(tasks);
  }
);

const get = catchAsync(async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const task = await getTask(id);

  res.json(task);
});

const create = catchAsync(
  async (
    req: Request<
      {
        projectId: string;
      },
      {},
      {
        title: string;
        description: string;
        status: string;
        assignedTo: string;
      }
    >,
    res: Response
  ) => {
    const { projectId } = req.params;

    const task = await createTask({ projectId, ...req.body });

    res.json(task);
  }
);

const update = catchAsync(
  async (
    req: Request<
      { id: string },
      {},
      {
        title: string;
        description: string;
        status: string;
        assignedTo: string;
      }
    >,
    res: Response
  ) => {
    const { id } = req.params;

    const task = await updateTask(id, req.body);

    res.json(task);
  }
);

const remove = catchAsync(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    await deleteTask(id);

    res.json({ message: "Task deleted" });
  }
);

export { list, get, create, update, remove };
