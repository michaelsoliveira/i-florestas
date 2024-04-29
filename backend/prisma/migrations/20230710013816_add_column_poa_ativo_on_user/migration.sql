/*
  Warnings:

  - You are about to drop the column `id_projeto_active` on the `users` table. All the data in the column will be lost.
  - Added the required column `id_projeto_ativo` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_id_projeto_active_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "id_projeto_active",
ADD COLUMN     "id_poa_ativo" UUID,
ADD COLUMN     "id_projeto_ativo" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_poa_ativo_fkey" FOREIGN KEY ("id_poa_ativo") REFERENCES "poa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_projeto_ativo_fkey" FOREIGN KEY ("id_projeto_ativo") REFERENCES "projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
