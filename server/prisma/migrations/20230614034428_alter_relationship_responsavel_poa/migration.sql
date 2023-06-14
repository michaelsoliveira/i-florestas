-- DropForeignKey
ALTER TABLE "poa" DROP CONSTRAINT "poa_id_resp_elab_fkey";

-- DropForeignKey
ALTER TABLE "poa" DROP CONSTRAINT "poa_id_resp_exec_fkey";

-- DropForeignKey
ALTER TABLE "responsavel_elaboracao" DROP CONSTRAINT "responsavel_elaboracao_id_resp_tecnico_fkey";

-- DropForeignKey
ALTER TABLE "responsavel_execucao" DROP CONSTRAINT "responsavel_execucao_id_resp_tecnico_fkey";

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_resp_exec_fkey" FOREIGN KEY ("id_resp_exec") REFERENCES "responsavel_execucao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poa" ADD CONSTRAINT "poa_id_resp_elab_fkey" FOREIGN KEY ("id_resp_elab") REFERENCES "responsavel_elaboracao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsavel_execucao" ADD CONSTRAINT "responsavel_execucao_id_resp_tecnico_fkey" FOREIGN KEY ("id_resp_tecnico") REFERENCES "responsavel_tecnico"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsavel_elaboracao" ADD CONSTRAINT "responsavel_elaboracao_id_resp_tecnico_fkey" FOREIGN KEY ("id_resp_tecnico") REFERENCES "responsavel_tecnico"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
