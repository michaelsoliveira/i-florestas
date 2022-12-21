/*
  Warnings:

  - You are about to alter the column `dap` on the `arvore` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,2)`.
  - You are about to alter the column `altura` on the `arvore` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,2)`.
  - You are about to alter the column `volume` on the `arvore` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "arvore" ALTER COLUMN "dap" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "altura" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "volume" SET DATA TYPE DECIMAL(5,2);
