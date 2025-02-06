import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Empresa = prisma.empresa;
const Produtos = prisma.produto;

export { Empresa, Produtos };
