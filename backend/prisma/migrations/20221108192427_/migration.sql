/*
  Warnings:

  - You are about to drop the column `active` on the `projeto` table. All the data in the column will be lost.
  - You are about to drop the `empresa_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "empresa_users" DROP CONSTRAINT "FK_9197746d4fec9555520a45d1ad0";

-- DropForeignKey
ALTER TABLE "empresa_users" DROP CONSTRAINT "FK_ea3cb7162981b687e4daa856bf1";

-- DropIndex
DROP INDEX "projeto_active_id_empresa_key";

-- AlterTable
ALTER TABLE "projeto" DROP COLUMN "active";

-- DropTable
DROP TABLE "empresa_users";

-- CreateTable
CREATE TABLE "projeto_users" (
    "id_projeto" UUID NOT NULL,
    "id_user" UUID NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PK_57c5338b1a54ea499a79c1286f2" PRIMARY KEY ("id_projeto","id_user")
);

-- CreateIndex
CREATE INDEX "IDX_9197746d4fec9555520a45d1ad" ON "projeto_users"("id_projeto");

-- CreateIndex
CREATE INDEX "IDX_ea3cb7162981b687e4daa856bf" ON "projeto_users"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "projeto_users_id_projeto_id_user_active_key" ON "projeto_users"("id_projeto", "id_user", "active");

-- AddForeignKey
ALTER TABLE "projeto_users" ADD CONSTRAINT "FK_9197746d4fec9555520a45d1ad0" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projeto_users" ADD CONSTRAINT "FK_ea3cb7162981b687e4daa856bf1" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
