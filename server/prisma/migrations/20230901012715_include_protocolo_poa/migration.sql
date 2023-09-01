/*
  Warnings:

  - You are about to drop the column `numero_art` on the `responsavel_tecnico` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "poa" ADD COLUMN     "num_art_resp_elab" INTEGER,
ADD COLUMN     "num_art_resp_exec" INTEGER,
ADD COLUMN     "protocolo_poa" TEXT;

-- AlterTable
ALTER TABLE "responsavel_tecnico" DROP COLUMN "numero_art";
