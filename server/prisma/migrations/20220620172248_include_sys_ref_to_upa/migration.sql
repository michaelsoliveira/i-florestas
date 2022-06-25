/*
  Warnings:

  - You are about to drop the column `sys_ref_coord` on the `upa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "upa" DROP COLUMN "sys_ref_coord",
ADD COLUMN     "srid" INTEGER;

-- AddForeignKey
ALTER TABLE "upa" ADD CONSTRAINT "upa_srid_fkey" FOREIGN KEY ("srid") REFERENCES "spatial_ref_sys"("srid") ON DELETE NO ACTION ON UPDATE CASCADE;
