/*
  Warnings:

  - Added the required column `id_role` to the `projeto_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projeto_users" ADD COLUMN     "id_role" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "projeto_users" ADD CONSTRAINT "projeto_users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
