import prisma from "../prisma/client.js";
import { Prisma } from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
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

    const secret = process.env.JWT_ACCESS_SECRET;
    const expiresIn = 60 * 60 * 0.25;
    const token = jwt.sign(user, secret, { expiresIn: expiresIn });

    user.token = token;
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
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
    return res.status(500).json({ error });
  }

  const user = req.body;

  try {
    const createUser = await prisma.user.create({
      data: user,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email or username"
        );
      }
    }
    return res.status(400).json({
      message: "Email or username already exist",
    });
  }

  return res.json({ message: "User successfully created" });
};
