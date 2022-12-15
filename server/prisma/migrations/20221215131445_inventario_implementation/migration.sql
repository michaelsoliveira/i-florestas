/*
  Warnings:

  - You are about to drop the `ResponsavelTecnico` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResponsavelTecnico" DROP CONSTRAINT "ResponsavelTecnico_id_projeto_fkey";

-- DropTable
DROP TABLE "ResponsavelTecnico";

-- CreateTable
CREATE TABLE "responsavel_tecnico" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" VARCHAR(100) NOT NULL,
    "crea" VARCHAR(50),
    "id_projeto" UUID,

    CONSTRAINT "PK_bee78e8f1760ccf9cff402118a7" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "responsavel_tecnico" ADD CONSTRAINT "responsavel_tecnico_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
