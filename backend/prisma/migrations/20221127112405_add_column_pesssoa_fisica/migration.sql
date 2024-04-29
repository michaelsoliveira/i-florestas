/*
  Warnings:

  - You are about to drop the column `nome` on the `pessoa` table. All the data in the column will be lost.
  - Added the required column `nome_fantasia` to the `pessoa_juridica` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pessoa" DROP CONSTRAINT "pessoa_id_telefone_fkey";

-- AlterTable
ALTER TABLE "pessoa" DROP COLUMN "nome";

-- AlterTable
ALTER TABLE "pessoa_fisica" ADD COLUMN     "nome" TEXT;

-- AlterTable
ALTER TABLE "pessoa_juridica" ADD COLUMN     "nome_fantasia" VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_telefone_fkey" FOREIGN KEY ("id_telefone") REFERENCES "Telefone"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
