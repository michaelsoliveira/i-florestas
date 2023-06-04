/*
  Warnings:

  - Added the required column `motivo_nao_derrubada` to the `arvore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "arvore" ADD COLUMN     "motivo_nao_derrubada" VARCHAR(120) NOT NULL,
ADD COLUMN     "substituida" BOOLEAN NOT NULL DEFAULT false;
