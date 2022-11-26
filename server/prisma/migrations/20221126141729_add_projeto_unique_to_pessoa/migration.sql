/*
  Warnings:

  - A unique constraint covering the columns `[id_projeto]` on the table `pessoa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pessoa_id_projeto_key" ON "pessoa"("id_projeto");
