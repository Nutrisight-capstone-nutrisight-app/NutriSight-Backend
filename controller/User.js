import prisma from "../prisma/client.js";

export const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return res.json(user);
};

export const createUser = async (req, res) => {
  const user = req.body;
  const createUser = await prisma.user.create({
    data: user,
  });
  return res.json("succes");
};

export const editUser = (req, res) => {};

export const deleteUser = (req, res) => {};
