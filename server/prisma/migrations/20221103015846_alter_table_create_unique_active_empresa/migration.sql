/*
  Warnings:

  - A unique constraint covering the columns `[active,id_empresa]` on the table `projeto` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "projeto_nome_id_empresa_key";

-- AlterTable
ALTER TABLE "projeto" ALTER COLUMN "active" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "projeto_active_id_empresa_key" ON "projeto"("active", "id_empresa");
