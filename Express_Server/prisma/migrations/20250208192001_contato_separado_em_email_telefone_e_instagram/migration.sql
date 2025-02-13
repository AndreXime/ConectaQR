/*
  Warnings:

  - You are about to drop the column `contato` on the `Empresa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "contato",
ADD COLUMN     "emailContato" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "telefone" TEXT;
