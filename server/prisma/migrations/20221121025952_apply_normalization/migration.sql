/*
  Warnings:

  - You are about to drop the column `id_empresa` on the `endereco` table. All the data in the column will be lost.
  - You are about to drop the `empresa` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoPessoa" AS ENUM ('Fisica', 'Juridica');

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
    "tipo" "TipoPessoa" NOT NULL,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponsavelTecnico" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "crea" VARCHAR(50),
    "id_projeto" UUID,
    "id_pessoa" UUID,
    "id_endereco" UUID,
    "id_telefone" UUID,

    CONSTRAINT "PK_bee78e8f1760ccf9cff402118a7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa_fisica" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" VARCHAR(100) NOT NULL,
    "rg" VARCHAR(30),
    "cpf" VARCHAR(14),
    "data_nascimento" TIMESTAMP(3),
    "id_projeto" UUID,
    "id_pessoa" UUID,
    "id_telefone" UUID,

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
    "nome_fantasia" VARCHAR(100),
    "inscricao_estadual" VARCHAR(30),
    "inscricao_federal" VARCHAR(30),
    "cnpj" VARCHAR(14),
    "data_constituicao" TIMESTAMP(3),
    "id_projeto" UUID,
    "id_pessoa" UUID,
    "id_endereco" UUID NOT NULL,
    "id_telefone" UUID,

    CONSTRAINT "PK_bee78e8f1760ccf9cff402118a6" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EnderecoToPessoaFisica" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ResponsavelTecnico_id_projeto_id_pessoa_key" ON "ResponsavelTecnico"("id_projeto", "id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_fisica_id_projeto_id_pessoa_key" ON "pessoa_fisica"("id_projeto", "id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_id_projeto_id_pessoa_key" ON "pessoa_juridica"("id_projeto", "id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "_EnderecoToPessoaFisica_AB_unique" ON "_EnderecoToPessoaFisica"("A", "B");

-- CreateIndex
CREATE INDEX "_EnderecoToPessoaFisica_B_index" ON "_EnderecoToPessoaFisica"("B");

-- AddForeignKey
ALTER TABLE "ResponsavelTecnico" ADD CONSTRAINT "ResponsavelTecnico_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ResponsavelTecnico" ADD CONSTRAINT "ResponsavelTecnico_id_telefone_fkey" FOREIGN KEY ("id_telefone") REFERENCES "Telefone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ResponsavelTecnico" ADD CONSTRAINT "ResponsavelTecnico_id_endereco_fkey" FOREIGN KEY ("id_endereco") REFERENCES "endereco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ResponsavelTecnico" ADD CONSTRAINT "ResponsavelTecnico_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa_fisica" ADD CONSTRAINT "pessoa_fisica_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa_fisica" ADD CONSTRAINT "pessoa_fisica_id_telefone_fkey" FOREIGN KEY ("id_telefone") REFERENCES "Telefone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa_fisica" ADD CONSTRAINT "pessoa_fisica_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "pessoa_juridica_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "pessoa_juridica_id_telefone_fkey" FOREIGN KEY ("id_telefone") REFERENCES "Telefone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "pessoa_juridica_id_endereco_fkey" FOREIGN KEY ("id_endereco") REFERENCES "endereco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "pessoa_juridica_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_EnderecoToPessoaFisica" ADD CONSTRAINT "_EnderecoToPessoaFisica_A_fkey" FOREIGN KEY ("A") REFERENCES "endereco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnderecoToPessoaFisica" ADD CONSTRAINT "_EnderecoToPessoaFisica_B_fkey" FOREIGN KEY ("B") REFERENCES "pessoa_fisica"("id") ON DELETE CASCADE ON UPDATE CASCADE;
