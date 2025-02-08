import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from "../services/user.service";
import { catchAsync } from "../utils/catchAsync";

const list = async (req: Request, res: Response) => {
  const users = await listUsers();

  res.json(users);
};

const get = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const user = await getUser(id);

  res.json(user);
};

const create = catchAsync(
  async (
    req: Request<{}, {}, { name: string; email: string; role: string }>,
    res: Response
  ) => {
    const { name, email, role } = req.body;

    const user = await createUser({ name, email, role });

    res.json(user);
  }
);

const update = catchAsync(
  async (
    req: Request<
      { id: string },
      {},
      { name?: string; email?: string; role?: string }
    >,
    res: Response
  ) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const user = await updateUser(id, { name, email, role });

    res.json(user);
  }
);

const softDelete = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  await deleteUser(id);

  res.json({ message: "User deleted" });
};

export { list, get, create, update, softDelete };
