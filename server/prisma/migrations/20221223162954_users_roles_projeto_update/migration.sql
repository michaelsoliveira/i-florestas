/*
  Warnings:

  - The primary key for the `users_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `projeto_users` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `id_projeto` on table `users_roles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "projeto_users" DROP CONSTRAINT "FK_9197746d4fec9555520a45d1ad0";

-- DropForeignKey
ALTER TABLE "projeto_users" DROP CONSTRAINT "FK_ea3cb7162981b687e4daa856bf1";

-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "FK_ea3cb7162981b687e4daa856bf0";

-- AlterTable
ALTER TABLE "projeto" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c",
ALTER COLUMN "id_projeto" SET NOT NULL,
ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("user_id", "role_id", "id_projeto");

-- DropTable
DROP TABLE "projeto_users";

-- CreateIndex
CREATE INDEX "IDX_e4435209df12bc1f001e536011" ON "users_roles"("id_projeto");

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "FK_ea3cb7162981b687e4daa856bf0" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
