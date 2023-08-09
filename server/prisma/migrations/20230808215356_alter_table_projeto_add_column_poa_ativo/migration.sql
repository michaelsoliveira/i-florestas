-- AlterTable
ALTER TABLE "projeto" ADD COLUMN     "id_poa_ativo" UUID;

-- AddForeignKey
ALTER TABLE "projeto" ADD CONSTRAINT "projeto_id_poa_ativo_fkey" FOREIGN KEY ("id_poa_ativo") REFERENCES "poa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
