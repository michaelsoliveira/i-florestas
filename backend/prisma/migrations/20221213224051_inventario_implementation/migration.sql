/*
  Warnings:

  - You are about to drop the `Telefone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pessoa" DROP CONSTRAINT "pessoa_id_telefone_fkey";

-- DropTable
DROP TABLE "Telefone";

-- CreateTable
CREATE TABLE "telefone" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ddd" TEXT,
    "numero" VARCHAR(10),

    CONSTRAINT "telefone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_telefone_fkey" FOREIGN KEY ("id_telefone") REFERENCES "telefone"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
