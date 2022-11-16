/*
  Warnings:

  - The primary key for the `projeto_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id_projeto,id_user,id_role,active]` on the table `projeto_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_role` to the `projeto_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "projeto_users_id_projeto_id_user_active_key";

-- AlterTable
ALTER TABLE "projeto_users" DROP CONSTRAINT "PK_57c5338b1a54ea499a79c1286f2",
ADD COLUMN     "id_role" UUID NOT NULL,
ADD CONSTRAINT "PK_57c5338b1a54ea499a79c1286f2" PRIMARY KEY ("id_projeto", "id_user", "id_role");

-- CreateIndex
CREATE INDEX "projeto_users_id_role_idx" ON "projeto_users"("id_role");

-- CreateIndex
CREATE UNIQUE INDEX "projeto_users_id_projeto_id_user_id_role_active_key" ON "projeto_users"("id_projeto", "id_user", "id_role", "active");

-- AddForeignKey
ALTER TABLE "projeto_users" ADD CONSTRAINT "projeto_users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
