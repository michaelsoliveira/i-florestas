/*
  Warnings:

  - You are about to drop the `Detentor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Proponente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `responsavel_elaboracao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `responsavel_execucao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Detentor" DROP CONSTRAINT "Detentor_id_pessoa_fkey";

-- DropForeignKey
ALTER TABLE "Proponente" DROP CONSTRAINT "Proponente_id_pessoa_fkey";

-- DropForeignKey
ALTER TABLE "poa" DROP CONSTRAINT "poa_id_detentor_fkey";

-- DropForeignKey
ALTER TABLE "poa" DROP CONSTRAINT "poa_id_proponente_fkey";

-- DropForeignKey
ALTER TABLE "poa" DROP CONSTRAINT "poa_id_resp_elab_fkey";

-- DropForeignKey
ALTER TABLE "poa" DROP CONSTRAINT "poa_id_resp_exec_fkey";

-- DropForeignKey
ALTER TABLE "responsavel_elaboracao" DROP CONSTRAINT "responsavel_elaboracao_id_resp_tecnico_fkey";

-- DropForeignKey
ALTER TABLE "responsavel_execucao" DROP CONSTRAINT "responsavel_execucao_id_resp_tecnico_fkey";

-- DropTable
DROP TABLE "Detentor";

-- DropTable
DROP TABLE "Proponente";

-- DropTable
DROP TABLE "responsavel_elaboracao";

-- DropTable
DROP TABLE "responsavel_execucao";

-- CreateTable
CREATE TABLE "proponente" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_pessoa" UUID,

    CONSTRAINT "proponente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detentor" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id_pessoa" UUID,

    CONSTRAINT "detentor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "proponente_id_pessoa_key" ON "proponente"("id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "detentor_id_pessoa_key" ON "detentor"("id_pessoa");

-- AddForeignKey
ALTER TABLE "proponente" ADD CONSTRAINT "proponente_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa_fisica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detentor" ADD CONSTRAINT "detentor_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa_fisica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_resp_exec_fkey" FOREIGN KEY ("id_resp_exec") REFERENCES "responsavel_tecnico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_resp_elab_fkey" FOREIGN KEY ("id_resp_elab") REFERENCES "responsavel_tecnico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_proponente_fkey" FOREIGN KEY ("id_proponente") REFERENCES "proponente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_detentor_fkey" FOREIGN KEY ("id_detentor") REFERENCES "detentor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
