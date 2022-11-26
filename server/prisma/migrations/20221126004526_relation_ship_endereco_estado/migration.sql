/*
  Warnings:

  - You are about to drop the column `estado` on the `endereco` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "endereco" DROP COLUMN "estado",
ADD COLUMN     "id_estado" UUID;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "estado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
