/*
  Warnings:

  - You are about to drop the column `id_empresa` on the `endereco` table. All the data in the column will be lost.
  - You are about to drop the `empresa` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoPessoa" AS ENUM ('F', 'J');

-- DropForeignKey
ALTER TABLE "empresa" DROP CONSTRAINT "FK_5c89069177d3ac18f7e268e7b07";

-- DropForeignKey
ALTER TABLE "endereco" DROP CONSTRAINT "FK_a72fa0a052cd28afba4a0e776c5";

-- AlterTable
ALTER TABLE "endereco" DROP COLUMN "id_empresa";

-- AlterTable
ALTER TABLE "projeto" ADD COLUMN     "dmin_relatorio" INTEGER,
ADD COLUMN     "intervalo_dmin_relatorio" INTEGER,
ADD COLUMN     "reg_ambiental" VARCHAR(50);

-- DropTable
DROP TABLE "empresa";

-- CreateTable
CREATE TABLE "pessoa" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" VARCHAR(100) NOT NULL,
    "tipo" "TipoPessoa" NOT NULL DEFAULT E'F',
    "id_endereco" UUID NOT NULL,
    "id_telefone" UUID,
    "id_projeto" UUID,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponsavelTecnico" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "crea" VARCHAR(50),
    "id_projeto" UUID,
    "id_pessoa" UUID,

    CONSTRAINT "PK_bee78e8f1760ccf9cff402118a7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa_fisica" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rg" VARCHAR(30),
    "cpf" VARCHAR(14),
    "id_pessoa" UUID,

    CONSTRAINT "pessoa_fisica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telefone" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ddd" TEXT,
    "numero" VARCHAR(10),

    CONSTRAINT "Telefone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa_juridica" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "razao_social" VARCHAR(100) NOT NULL,
    "inscricao_estadual" VARCHAR(30),
    "inscricao_federal" VARCHAR(30),
    "cnpj" VARCHAR(14),
    "id_pessoa" UUID,

    CONSTRAINT "PK_bee78e8f1760ccf9cff402118a6" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResponsavelTecnico_id_projeto_id_pessoa_key" ON "ResponsavelTecnico"("id_projeto", "id_pessoa");

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_telefone_fkey" FOREIGN KEY ("id_telefone") REFERENCES "Telefone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_endereco_fkey" FOREIGN KEY ("id_endereco") REFERENCES "endereco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ResponsavelTecnico" ADD CONSTRAINT "ResponsavelTecnico_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ResponsavelTecnico" ADD CONSTRAINT "ResponsavelTecnico_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa_fisica" ADD CONSTRAINT "pessoa_fisica_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "pessoa_juridica_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
