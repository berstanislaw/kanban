import { object, string, enum as zEnum } from "zod";
import { UserRoles } from "../enums/user.enum";

const createUserSchema = object({
  body: object({
    email: string().email(),
    password: string(),
    name: string(),
    role: zEnum([UserRoles.ADMIN, UserRoles.USER, UserRoles.MANAGER]),
  }),
});

const updateUserSchema = object({
  params: object({ id: string() }),
  body: object({
    name: string().optional(),
    email: string().email().optional(),
    role: zEnum([
      UserRoles.ADMIN,
      UserRoles.USER,
      UserRoles.MANAGER,
    ]).optional(),
  }),
});

const deleteUserSchema = object({
  params: object({ id: string() }),
});

const getUserSchema = object({
  params: object({ id: string() }),
});

export { createUserSchema, updateUserSchema, deleteUserSchema, getUserSchema };
