/*
  Warnings:

  - A unique constraint covering the columns `[nome,id_empresa]` on the table `projeto` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "projeto" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "projeto_nome_id_empresa_key" ON "projeto"("nome", "id_empresa");
