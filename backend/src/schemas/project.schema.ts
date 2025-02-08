import { object, string, enum as zEnum } from "zod";
import { ProjectStatus } from "../enums/project.enum";

const createProjectSchema = object({
  body: object({
    name: string(),
    description: string(),
    status: zEnum([ProjectStatus.ACTIVE, ProjectStatus.INACTIVE]),
    managerId: string(),
  }),
});

const updateProjectSchema = object({
  params: object({
    id: string(),
  }),
  body: object({
    name: string().optional(),
    description: string().optional(),
    status: zEnum([ProjectStatus.ACTIVE, ProjectStatus.INACTIVE]).optional(),
    managerId: string().optional(),
  }),
});

const getProjectSchema = object({
  params: object({
    id: string(),
  }),
});

const deleteProjectSchema = object({
  params: object({
    id: string(),
  }),
});

export {
  createProjectSchema,
  updateProjectSchema,
  getProjectSchema,
  deleteProjectSchema,
};
