/*
  Warnings:

  - You are about to drop the column `id_projeto` on the `equacao_modelo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "equacao_modelo" DROP CONSTRAINT "equacao_modelo_id_projeto_fkey";

-- AlterTable
ALTER TABLE "equacao_modelo" DROP COLUMN "id_projeto";
