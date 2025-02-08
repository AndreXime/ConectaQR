import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Empresa = prisma.empresa;
const Produtos = prisma.produto;
const Categoria = prisma.categoria;

export { Empresa, Produtos, Categoria };
