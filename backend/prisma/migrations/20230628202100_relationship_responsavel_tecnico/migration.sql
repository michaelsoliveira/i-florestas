/*
  Warnings:

  - You are about to drop the `responsavel_elaboracao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `responsavel_execucao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "poa" DROP CONSTRAINT "poa_id_resp_elab_fkey";

-- DropForeignKey
ALTER TABLE "poa" DROP CONSTRAINT "poa_id_resp_exec_fkey";

-- DropForeignKey
ALTER TABLE "responsavel_elaboracao" DROP CONSTRAINT "responsavel_elaboracao_id_resp_tecnico_fkey";

-- DropForeignKey
ALTER TABLE "responsavel_execucao" DROP CONSTRAINT "responsavel_execucao_id_resp_tecnico_fkey";

-- DropTable
DROP TABLE "responsavel_elaboracao";

-- DropTable
DROP TABLE "responsavel_execucao";

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_resp_exec_fkey" FOREIGN KEY ("id_resp_exec") REFERENCES "responsavel_tecnico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_resp_elab_fkey" FOREIGN KEY ("id_resp_elab") REFERENCES "responsavel_tecnico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
