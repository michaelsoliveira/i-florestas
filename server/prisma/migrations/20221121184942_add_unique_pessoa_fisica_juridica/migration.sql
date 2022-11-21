/*
  Warnings:

  - A unique constraint covering the columns `[id_pessoa]` on the table `pessoa_fisica` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_pessoa]` on the table `pessoa_juridica` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pessoa_fisica_id_pessoa_key" ON "pessoa_fisica"("id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_id_pessoa_key" ON "pessoa_juridica"("id_pessoa");
