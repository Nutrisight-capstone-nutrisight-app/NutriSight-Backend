import { json } from "express";
import prisma from "../prisma/client.js";
import { Prisma } from "../prisma/client.js";

export const createSave = async (req, res) => {
  const productId = req.body.id;
  const save = await prisma.save.create({
    data: {},
  });
  if (req.body.id == null) {
    return res.status(404).json({ message: "Id not Found" });
  }
  const productOnSave = await prisma.productsOnSaves.create({
    data: {
      saveId: save.id,
      productId: productId,
    },
  });
  return res.status(200).json({ message: "save successful" });
};

export const getSavedbyId = async (req, res) => {
  if (req.params.id == null) {
    return res.status(404).json({ message: "Id not Found" });
  }
  const savedProduct = await prisma.save.findUnique({
    where: { id: req.params.id },
  });
  return res.json(savedProduct);
};
