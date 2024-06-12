import prisma from "../prisma/client.js";

export const createSave = async (req, res) => {
  const productId = req.body.productId;
  if (productId == null) {
    return res.status(404).json({ message: "Id not Found" });
  }

  const userId = req.user.id;
  const save = await prisma.save.create({
    data: {
      userId: userId,
    },
  });
  const productOnSave = await prisma.productsOnSaves.create({
    data: {
      saveId: save.id,
      productId: productId,
    },
  });

  return res.status(200).json({ message: "save successful" });
};

export const getSavedByUserId = async (req, res) => {
  const savedProduct = await prisma.save.findMany({
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
  return res.status(200).json({ savedProduct: savedProduct });
};
