import { object, string, enum as zEnum } from "zod";
import { TaskStatus } from "../enums/task.enum";

const createTaskSchema = object({
  params: object({
    projectId: string(),
  }),
  body: object({
    title: string(),
    description: string(),
    status: zEnum([
      TaskStatus.DONE,
      TaskStatus.IN_PROGRESS,
      TaskStatus.PENDING,
    ]),
    assignedTo: string(),
  }),
});

const updateTaskSchema = object({
  params: object({
    projectId: string(),
    id: string(),
  }),
  body: object({
    title: string().optional(),
    description: string().optional(),
    status: zEnum([
      TaskStatus.DONE,
      TaskStatus.IN_PROGRESS,
      TaskStatus.PENDING,
    ]).optional(),
    assignedTo: string().optional(),
  }),
});

const getTaskSchema = object({
  params: object({
    projectId: string(),
    id: string(),
  }),
});

const listTaskSchema = object({
  params: object({
    projectId: string(),
  }),
});

const deleteTaskSchema = object({
  params: object({
    projectId: string(),
    id: string(),
  }),
});

export {
  createTaskSchema,
  updateTaskSchema,
  getTaskSchema,
  listTaskSchema,
  deleteTaskSchema,
};
