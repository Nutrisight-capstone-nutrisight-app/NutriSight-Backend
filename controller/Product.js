import prisma from "../prisma/client.js";
import { Prisma } from "../prisma/client.js";

export const getProductById = async (req, res) => {
  //   console.log(req.body.id);
  const product = await prisma.product.findUnique({
    where: { id: Number(req.params.id) },
  });
  return res.json(product);
};
