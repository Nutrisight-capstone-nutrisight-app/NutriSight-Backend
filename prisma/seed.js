import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "testing@amial.com",
      username: "tes1",
      password: "$2a$10$OBkWWbKs.IwoLRYGUIfzueMwzrqd3ZrQ/ei/4t8.VQWZzQGOZMxQe",
    },
  });

  await prisma.save.create({
    data: {
      userId: user.id,
    },
  });

  //   const product = await prisma.product.create({
  //     data: { name: "mijon" },
  //   });

  console.log([user]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
