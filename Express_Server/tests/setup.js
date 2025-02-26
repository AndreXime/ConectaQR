const { execSync } = require("child_process");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

beforeAll(async () => {
  execSync("npm run seed");
});

afterAll(async () => {
  await prisma.$disconnect();
});
