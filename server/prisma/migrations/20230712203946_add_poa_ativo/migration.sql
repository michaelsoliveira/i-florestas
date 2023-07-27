-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_id_poa_ativo_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_id_projeto_ativo_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_poa_ativo_fkey" FOREIGN KEY ("id_poa_ativo") REFERENCES "poa"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_projeto_ativo_fkey" FOREIGN KEY ("id_projeto_ativo") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
