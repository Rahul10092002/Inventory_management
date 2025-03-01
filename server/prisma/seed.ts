import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function deleteAllData() {
  console.log("Deleting existing data...");
     
  // Delete dependent tables first
  await prisma.sales.deleteMany();
  await prisma.purchases.deleteMany();
  await prisma.expenseByCategory.deleteMany();
  await prisma.expenseSummary.deleteMany();
  await prisma.salesSummary.deleteMany();
  await prisma.purchaseSummary.deleteMany();

  // Now delete parent tables
  await prisma.products.deleteMany();
  await prisma.expenses.deleteMany();
  await prisma.users.deleteMany();

  console.log("All data cleared.");
}

async function seedData() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "users.json",
    "expenses.json",
    "expenseSummary.json",
    "expenseByCategory.json",
    "products.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
  ];

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skipping ${fileName}: File not found.`);
      continue;
    }

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      await model.create({ data });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

async function main() {
  await deleteAllData();
  await seedData();
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
