/*
  Warnings:

  - The `id_situacao` column on the `arvore` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id_motivo_preservacao` column on the `arvore` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `motivo_preservacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `motivo_preservacao` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `situacao_arvore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `situacao_arvore` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "arvore" DROP CONSTRAINT "arvore_id_motivo_preservacao_fkey";

-- DropForeignKey
ALTER TABLE "arvore" DROP CONSTRAINT "arvore_id_situacao_fkey";

-- AlterTable
ALTER TABLE "arvore" ADD COLUMN     "id_substituta" UUID,
DROP COLUMN "id_situacao",
ADD COLUMN     "id_situacao" INTEGER,
DROP COLUMN "id_motivo_preservacao",
ADD COLUMN     "id_motivo_preservacao" INTEGER;

-- AlterTable
ALTER TABLE "motivo_preservacao" DROP CONSTRAINT "motivo_preservacao_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "motivo_preservacao_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "situacao_arvore" DROP CONSTRAINT "situacao_arvore_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "situacao_arvore_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "arvore" ADD CONSTRAINT "arvore_id_situacao_fkey" FOREIGN KEY ("id_situacao") REFERENCES "situacao_arvore"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "arvore" ADD CONSTRAINT "arvore_id_motivo_preservacao_fkey" FOREIGN KEY ("id_motivo_preservacao") REFERENCES "motivo_preservacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "arvore" ADD CONSTRAINT "arvore_id_substituta_fkey" FOREIGN KEY ("id_substituta") REFERENCES "arvore"("id") ON DELETE SET NULL ON UPDATE CASCADE;
