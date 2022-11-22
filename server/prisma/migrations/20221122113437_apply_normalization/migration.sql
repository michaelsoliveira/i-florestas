/*
  Warnings:

  - You are about to drop the column `id_empresa` on the `endereco` table. All the data in the column will be lost.
  - The primary key for the `projeto_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_role` on the `projeto_users` table. All the data in the column will be lost.
  - You are about to drop the `empresa` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_projeto,id_user,active]` on the table `projeto_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TipoPessoa" AS ENUM ('F', 'J');

-- DropForeignKey
ALTER TABLE "empresa" DROP CONSTRAINT "FK_5c89069177d3ac18f7e268e7b07";

-- DropForeignKey
ALTER TABLE "endereco" DROP CONSTRAINT "FK_a72fa0a052cd28afba4a0e776c5";

-- DropForeignKey
ALTER TABLE "projeto_users" DROP CONSTRAINT "projeto_users_id_role_fkey";

-- DropIndex
DROP INDEX "projeto_users_id_projeto_id_user_id_role_active_key";

-- DropIndex
DROP INDEX "projeto_users_id_role_idx";

-- AlterTable
ALTER TABLE "categoria_especie" ADD COLUMN     "id_projeto" UUID;

-- AlterTable
ALTER TABLE "endereco" DROP COLUMN "id_empresa";

-- AlterTable
ALTER TABLE "especie" ADD COLUMN     "id_projeto" UUID;

-- AlterTable
ALTER TABLE "projeto" ADD COLUMN     "data_exclusao" TIMESTAMP(3),
ADD COLUMN     "dmin_relatorio" INTEGER,
ADD COLUMN     "excluido" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "intervalo_dmin_relatorio" INTEGER,
ADD COLUMN     "reg_ambiental" VARCHAR(50);

-- AlterTable
ALTER TABLE "projeto_users" DROP CONSTRAINT "PK_57c5338b1a54ea499a79c1286f2",
DROP COLUMN "id_role",
ADD CONSTRAINT "PK_57c5338b1a54ea499a79c1286f2" PRIMARY KEY ("id_projeto", "id_user");

-- DropTable
DROP TABLE "empresa";

-- CreateTable
CREATE TABLE "pessoa" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" "TipoPessoa" NOT NULL DEFAULT E'F',
    "nome" VARCHAR(100) NOT NULL,
    "id_projeto" UUID,
    "id_endereco" UUID,
    "id_telefone" UUID,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponsavelTecnico" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" VARCHAR(100) NOT NULL,
    "crea" VARCHAR(50),
    "id_projeto" UUID,

    CONSTRAINT "PK_bee78e8f1760ccf9cff402118a7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa_fisica" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rg" VARCHAR(30),
    "cpf" VARCHAR(14),
    "data_nascimento" TIMESTAMP(3),
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
    "data_constituicao" TIMESTAMP(3),
    "id_pessoa" UUID,

    CONSTRAINT "PK_bee78e8f1760ccf9cff402118a6" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_fisica_id_pessoa_key" ON "pessoa_fisica"("id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_id_pessoa_key" ON "pessoa_juridica"("id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "projeto_users_id_projeto_id_user_active_key" ON "projeto_users"("id_projeto", "id_user", "active");

-- AddForeignKey
ALTER TABLE "categoria_especie" ADD CONSTRAINT "categoria_especie_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_telefone_fkey" FOREIGN KEY ("id_telefone") REFERENCES "Telefone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_endereco_fkey" FOREIGN KEY ("id_endereco") REFERENCES "endereco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ResponsavelTecnico" ADD CONSTRAINT "ResponsavelTecnico_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa_fisica" ADD CONSTRAINT "pessoa_fisica_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "pessoa_juridica_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "especie" ADD CONSTRAINT "especie_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
