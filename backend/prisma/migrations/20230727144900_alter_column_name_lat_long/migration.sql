/*
  Warnings:

  - You are about to drop the column `lat_x` on the `arvore` table. All the data in the column will be lost.
  - You are about to drop the column `long_y` on the `arvore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "arvore" DROP COLUMN "lat_x",
DROP COLUMN "long_y",
ADD COLUMN     "lat_y" DOUBLE PRECISION,
ADD COLUMN     "long_x" DOUBLE PRECISION;
