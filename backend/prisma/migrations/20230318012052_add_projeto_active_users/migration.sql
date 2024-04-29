/*
  Warnings:

  - You are about to drop the column `active` on the `projeto` table. All the data in the column will be lost.
  - Added the required column `id_projeto_active` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projeto" DROP COLUMN "active";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "id_projeto_active" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_projeto_active_fkey" FOREIGN KEY ("id_projeto_active") REFERENCES "projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
