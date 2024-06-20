import prisma from "../prisma/client.js";
import { Prisma } from "../prisma/client.js";
import bcrypt from "bcrypt";

export const getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      username: true,
      email: true,
    },
  });

  const save = await prisma.save.findMany({
    where: { userId: req.user.id },
    select: {
      createdAt: true,
      ProductsOnSaves: {
        select: {
          product: true,
        },
      },
    },
  });

  let foodCal = 0;
  let drinkCal = 0;
  let gradeTotal = 0;

  if (save) {
    save.forEach((save) => {
      let saveproduct = save.ProductsOnSaves;
      let product = saveproduct[0].product;
      if (product.category == "Food") {
        foodCal += product.energyTotal;
      } else {
        drinkCal += product.energyTotal;
      }
      gradeTotal += product.levelAll;
    });
  }

  const totalCal = foodCal + drinkCal;
  let gradeAvg = Math.ceil(gradeTotal / save.length);
  if (!gradeAvg) {
    gradeAvg = 0;
  }

  switch (gradeAvg) {
    case 1:
      gradeAvg = "A";
      break;
    case 2:
      gradeAvg = "B";
      break;
    case 3:
      gradeAvg = "C";
      break;
    case 4:
      gradeAvg = "D";
      break;
    case 5:
      gradeAvg = "E";
      break;

    default:
      gradeAvg = "E";
      break;
  }

  const data = {
    foodCal: foodCal,
    drinkCal: drinkCal,
    totalCal: totalCal,
    gradeAvg: gradeAvg,
    saveAmount: save.length,
  };
  return res.status(200).json({ user: user, data: data });
};

export const editUser = async (req, res) => {
  const id = req.user.id;

  if (req.body.password !== undefined) {
    try {
      const saltRound = 10;
      const password = await bcrypt.hash(req.body.password, saltRound);
      req.body.password = password;
    } catch (error) {
      console.error("Error hashing password : ", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  try {
    const user = req.body;
    const editUser = await prisma.user.update({
      where: {
        id: id,
      },

      data: user,
    });
  } catch (error) {
    console.error("Error update user : ", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email or username"
        );
        return res.status(400).json({
          message: "Email or username already exist",
        });
      }
      if (error.code === "P2025") {
        console.log("User not Found");
        return res.status(404).json({ message: "User not Found" });
      }
    }
  }

  return res.status(200).json({ message: "User successfully edited" });
};

export const deleteUser = async (req, res) => {
  const id = req.user.id;

  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "user has been deleted" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.error(error);
        return res.status(404).json({ message: "User not Found" });
      }
    }
  }
};
