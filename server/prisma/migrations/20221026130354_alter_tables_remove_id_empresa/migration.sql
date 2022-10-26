/*
  Warnings:

  - You are about to drop the column `id_empresa` on the `umf` table. All the data in the column will be lost.
  - You are about to drop the column `id_empresa` on the `upa` table. All the data in the column will be lost.
  - You are about to drop the column `id_empresa` on the `ut` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ut" DROP CONSTRAINT "ut_id_empresa_fkey";

-- AlterTable
ALTER TABLE "umf" DROP COLUMN "id_empresa";

-- AlterTable
ALTER TABLE "upa" DROP COLUMN "id_empresa";

-- AlterTable
ALTER TABLE "ut" DROP COLUMN "id_empresa";
