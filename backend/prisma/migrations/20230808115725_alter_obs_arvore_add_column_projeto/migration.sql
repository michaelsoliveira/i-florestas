-- AlterTable
ALTER TABLE "observacao_arvore" ADD COLUMN     "id_projeto" UUID;

-- AddForeignKey
ALTER TABLE "observacao_arvore" ADD CONSTRAINT "observacao_arvore_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
