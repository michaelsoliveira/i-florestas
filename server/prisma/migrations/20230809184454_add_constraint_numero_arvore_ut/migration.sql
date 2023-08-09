/*
  Warnings:

  - A unique constraint covering the columns `[numero_arvore,id_ut]` on the table `arvore` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "arvore_numero_arvore_id_ut_key" ON "arvore"("numero_arvore", "id_ut");
