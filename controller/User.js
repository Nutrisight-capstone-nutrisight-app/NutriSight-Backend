import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";

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
  if (res.body?.name === undefined) {
    return res.status(400).send("Please insert name");
  }
  if (res.body?.email === undefined) {
    return res.status(400).send("Please insert email");
  }
  if (res.body?.usename === undefined) {
    return res.status(400).send("Please insert username");
  }
  if (res.body?.password === undefined) {
    return res.status(400).send("Please insert password");
  }

  try {
    const saltRound = 10;
    const password = await bcrypt.hash(req.body.password, saltRound);
    req.body.password = password;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
  const user = req.body;
  const createUser = await prisma.user.create({
    data: user,
  });
  return res.json("succes");
};

export const editUser = (req, res) => {};

export const deleteUser = (req, res) => {};
