/*
  Warnings:

  - You are about to drop the column `id_empresa` on the `equacao_modelo` table. All the data in the column will be lost.
  - You are about to drop the column `id_empresa` on the `equacao_volume` table. All the data in the column will be lost.
  - Added the required column `id_projeto` to the `equacao_modelo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_projeto` to the `equacao_volume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "equacao_modelo" DROP CONSTRAINT "equacao_modelo_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "equacao_volume" DROP CONSTRAINT "equacao_volume_id_empresa_fkey";

-- AlterTable
ALTER TABLE "equacao_modelo" DROP COLUMN "id_empresa",
ADD COLUMN     "id_projeto" UUID NOT NULL;

-- AlterTable
ALTER TABLE "equacao_volume" DROP COLUMN "id_empresa",
ADD COLUMN     "id_projeto" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "equacao_modelo" ADD CONSTRAINT "equacao_modelo_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equacao_volume" ADD CONSTRAINT "equacao_volume_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
