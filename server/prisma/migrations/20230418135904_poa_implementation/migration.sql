/*
  Warnings:

  - You are about to drop the column `art_resp_elab` on the `poa` table. All the data in the column will be lost.
  - You are about to drop the column `art_resp_exec` on the `poa` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_detentor` on the `poa` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_proponente` on the `poa` table. All the data in the column will be lost.
  - You are about to drop the column `crea_resp_elab` on the `poa` table. All the data in the column will be lost.
  - You are about to drop the column `crea_resp_exec` on the `poa` table. All the data in the column will be lost.
  - You are about to drop the column `nome_detentor` on the `poa` table. All the data in the column will be lost.
  - You are about to drop the column `nome_proponente` on the `poa` table. All the data in the column will be lost.
  - You are about to drop the column `nome_resp_elab` on the `poa` table. All the data in the column will be lost.
  - You are about to drop the column `nome_resp_exec` on the `poa` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `responsavel_tecnico` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "poa" DROP COLUMN "art_resp_elab",
DROP COLUMN "art_resp_exec",
DROP COLUMN "cpf_detentor",
DROP COLUMN "cpf_proponente",
DROP COLUMN "crea_resp_elab",
DROP COLUMN "crea_resp_exec",
DROP COLUMN "nome_detentor",
DROP COLUMN "nome_proponente",
DROP COLUMN "nome_resp_elab",
DROP COLUMN "nome_resp_exec",
ADD COLUMN     "id_detentor" UUID,
ADD COLUMN     "id_proponente" UUID,
ADD COLUMN     "id_resp_elab" UUID,
ADD COLUMN     "id_resp_exec" UUID;

-- AlterTable
ALTER TABLE "responsavel_tecnico" DROP COLUMN "nome",
ADD COLUMN     "id_pessoa" UUID,
ADD COLUMN     "numero_art" INTEGER;

-- CreateTable
CREATE TABLE "responsavel_execucao" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_resp_tecnico" UUID,

    CONSTRAINT "responsavel_execucao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responsavel_elaboracao" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_resp_tecnico" UUID,

    CONSTRAINT "responsavel_elaboracao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proponente" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_pessoa" UUID,

    CONSTRAINT "Proponente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detentor" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_pessoa" UUID,

    CONSTRAINT "Detentor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proponente_id_pessoa_key" ON "Proponente"("id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "Detentor_id_pessoa_key" ON "Detentor"("id_pessoa");

-- AddForeignKey
ALTER TABLE "responsavel_tecnico" ADD CONSTRAINT "responsavel_tecnico_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa_fisica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "responsavel_execucao" ADD CONSTRAINT "responsavel_execucao_id_resp_tecnico_fkey" FOREIGN KEY ("id_resp_tecnico") REFERENCES "responsavel_tecnico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "responsavel_elaboracao" ADD CONSTRAINT "responsavel_elaboracao_id_resp_tecnico_fkey" FOREIGN KEY ("id_resp_tecnico") REFERENCES "responsavel_tecnico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Proponente" ADD CONSTRAINT "Proponente_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa_fisica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Detentor" ADD CONSTRAINT "Detentor_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa_fisica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_resp_exec_fkey" FOREIGN KEY ("id_resp_exec") REFERENCES "responsavel_execucao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_resp_elab_fkey" FOREIGN KEY ("id_resp_elab") REFERENCES "responsavel_elaboracao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_proponente_fkey" FOREIGN KEY ("id_proponente") REFERENCES "Proponente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_detentor_fkey" FOREIGN KEY ("id_detentor") REFERENCES "Detentor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
