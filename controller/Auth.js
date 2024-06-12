import prisma from "../prisma/client.js";
import { Prisma } from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user)
    return res.status(403).json({ error: "Invalid email or password" });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(403).json({ error: "Invalid email or password" });

  const { id, username } = user;
  const accessToken = generateToken({ id, username, email });
  await prisma.accessToken.create({
    data: {
      value: accessToken,
      userId: user.id,
    },
  });

  return res.status(200).json({ accessToken: accessToken });
};

export const createUser = async (req, res) => {
  if (req.body?.email === undefined) {
    return res.status(400).send({ message: "Please insert email" });
  }
  if (req.body?.username === undefined) {
    return res.status(400).send({ message: "Please insert username" });
  }
  if (req.body?.password === undefined) {
    return res.status(400).send({ message: "Please insert password" });
  }

  try {
    const saltRound = 10;
    const password = await bcrypt.hash(req.body.password, saltRound);
    req.body.password = password;
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).json({ error: "Server error" });
  }

  const user = req.body;

  try {
    await prisma.user.create({
      data: user,
    });
    return res.status(200).json({ message: "User successfully created" });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(400)
          .json({ message: "Email or username already exist" });
      }
    }
  }
};

export const deleteToken = async (req, res) => {
  const userId = req.user.id;
  try {
    await prisma.accessToken.delete({
      where: {
        userId: userId,
      },
    });
    return res.status(203).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "User not found" });
  }
};

function generateToken(user) {
  // const expiresInHour = 60 * 60 * 0.25;
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET);
}
