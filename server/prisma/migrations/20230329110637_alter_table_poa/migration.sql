/*
  Warnings:

  - You are about to drop the `Poa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Poa" DROP CONSTRAINT "Poa_id_projeto_fkey";

-- DropForeignKey
ALTER TABLE "Poa" DROP CONSTRAINT "Poa_id_situacao_fkey";

-- DropForeignKey
ALTER TABLE "Poa" DROP CONSTRAINT "Poa_user_id_fkey";

-- DropTable
DROP TABLE "Poa";

-- CreateTable
CREATE TABLE "poa" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "descricao" TEXT,
    "data_ultimo_plan" TIMESTAMP(6),
    "pmfs" TEXT,
    "nome_resp_elab" TEXT,
    "crea_resp_elab" TEXT,
    "art_resp_elab" TEXT,
    "nome_resp_exec" TEXT,
    "crea_resp_exec" TEXT,
    "art_resp_exec" TEXT,
    "nome_detentor" TEXT,
    "cpf_detentor" VARCHAR(12),
    "nome_proponente" TEXT,
    "cpf_proponente" VARCHAR(12),
    "id_situacao" UUID,
    "corte_maximo" DOUBLE PRECISION,
    "user_id" UUID NOT NULL,
    "id_projeto" UUID NOT NULL,

    CONSTRAINT "poa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_situacao_fkey" FOREIGN KEY ("id_situacao") REFERENCES "situacao_poa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
