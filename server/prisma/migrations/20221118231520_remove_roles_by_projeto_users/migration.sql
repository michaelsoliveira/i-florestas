/*
  Warnings:

  - The primary key for the `projeto_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_role` on the `projeto_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_projeto,id_user,active]` on the table `projeto_users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "projeto_users" DROP CONSTRAINT "projeto_users_id_role_fkey";

-- DropIndex
DROP INDEX "projeto_users_id_projeto_id_user_id_role_active_key";

-- DropIndex
DROP INDEX "projeto_users_id_role_idx";

-- AlterTable
ALTER TABLE "projeto_users" DROP CONSTRAINT "PK_57c5338b1a54ea499a79c1286f2",
DROP COLUMN "id_role",
ADD CONSTRAINT "PK_57c5338b1a54ea499a79c1286f2" PRIMARY KEY ("id_projeto", "id_user");

-- CreateIndex
CREATE UNIQUE INDEX "projeto_users_id_projeto_id_user_active_key" ON "projeto_users"("id_projeto", "id_user", "active");
