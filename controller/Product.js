import prisma from "../prisma/client.js";

export const getProductById = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json({ product: product });
};
