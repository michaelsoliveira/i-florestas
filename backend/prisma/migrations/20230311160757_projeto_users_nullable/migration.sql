/*
  Warnings:

  - The primary key for the `users_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c",
ALTER COLUMN "id_projeto" DROP NOT NULL,
ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("user_id", "role_id");
