/*
  Warnings:

  - You are about to drop the column `id_pessoa` on the `pessoa_fisica` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pessoa" DROP CONSTRAINT "pessoa_id_telefone_fkey";

-- DropForeignKey
ALTER TABLE "pessoa_fisica" DROP CONSTRAINT "pessoa_fisica_id_pessoa_fkey";

-- DropForeignKey
ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "pessoa_juridica_id_pessoa_fkey";

-- DropIndex
DROP INDEX "pessoa_fisica_id_pessoa_key";

-- AlterTable
ALTER TABLE "pessoa" ADD COLUMN     "id_pessoa_fisica" UUID,
ADD COLUMN     "id_pessoa_juridica" UUID;

-- AlterTable
ALTER TABLE "pessoa_fisica" DROP COLUMN "id_pessoa";

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_pessoa_fisica_fkey" FOREIGN KEY ("id_pessoa_fisica") REFERENCES "pessoa_fisica"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_telefone_fkey" FOREIGN KEY ("id_telefone") REFERENCES "Telefone"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_pessoa_juridica_fkey" FOREIGN KEY ("id_pessoa_juridica") REFERENCES "pessoa_juridica"("id") ON DELETE CASCADE ON UPDATE CASCADE;
