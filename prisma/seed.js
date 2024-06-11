import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: "Chitato",
      category: "Food",
      netWeight: 180,
      servingAmount: 9,
      servingSize: 20,
      energyTotal: 100,
      energyFat: 40,
      fatTotal: 4.5,
      saturatedFat: 2,
      protein: 0,
      carbohydrate: 15,
      sugar: 1,
      natrium: 60,
      fatGrade: "B",
      fatLevel: 2,
      sugarGrade: "A",
      sugarLevel: 1,
      natriumGrade: "A",
      natriumLevel: 1,
      gradeAll: "B",
      levelAll: 2,
    },
  });
  // const user = await prisma.user.create({
  //   data: {
  //     email: "testing@amial.com",
  //     username: "tes1",
  //     password: "$2a$10$OBkWWbKs.IwoLRYGUIfzueMwzrqd3ZrQ/ei/4t8.VQWZzQGOZMxQe",
  //   },
  // });

  // await prisma.save.create({
  //   data: {
  //     userId: user.id,
  //   },
  // });

  //   const product = await prisma.product.create({
  //     data: { name: "mijon" },
  //   });

  // console.log([user]);
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
