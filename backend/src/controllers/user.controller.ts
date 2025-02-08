import { Request, Response } from "express";
import { createUser, getUser, listUsers } from "../services/user.service";

const list = async (req: Request, res: Response) => {
  const users = await listUsers();

  res.json(users);
};

const get = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const user = await getUser(id);

  res.json(user);
};

const create = async (
  req: Request<{}, {}, { name: string; email: string; role: string }>,
  res: Response
) => {
  const { name, email, role } = req.body;

  const user = await createUser({ name, email, role });

  res.json(user);
};

export { list, get, create };
