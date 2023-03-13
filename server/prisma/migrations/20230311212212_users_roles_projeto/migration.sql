/*
  Warnings:

  - The primary key for the `users_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `id_projeto` on table `users_roles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c",
ALTER COLUMN "id_projeto" SET NOT NULL,
ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("user_id", "role_id", "id_projeto");
