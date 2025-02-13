/*
  Warnings:

  - You are about to drop the column `imagem` on the `Produto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imagemUrl` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "imagem",
ADD COLUMN     "imagemUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");
