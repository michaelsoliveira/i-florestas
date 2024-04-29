-- DropForeignKey
ALTER TABLE "responsavel_tecnico" DROP CONSTRAINT "responsavel_tecnico_id_pessoa_fkey";

-- AddForeignKey
ALTER TABLE "responsavel_tecnico" ADD CONSTRAINT "responsavel_tecnico_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
