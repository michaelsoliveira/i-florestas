/*
  Warnings:

  - You are about to drop the column `id_empresa` on the `projeto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "projeto" DROP CONSTRAINT "FK_5c89069177d3ac18f7e268e7b07";

-- AlterTable
ALTER TABLE "empresa" ADD COLUMN     "id_projeto" UUID;

-- AlterTable
ALTER TABLE "projeto" DROP COLUMN "id_empresa";

-- AddForeignKey
ALTER TABLE "empresa" ADD CONSTRAINT "FK_5c89069177d3ac18f7e268e7b07" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
