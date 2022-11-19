-- AlterTable
ALTER TABLE "categoria_especie" ADD COLUMN     "id_projeto" UUID;

-- AlterTable
ALTER TABLE "especie" ADD COLUMN     "id_projeto" UUID;

-- AddForeignKey
ALTER TABLE "categoria_especie" ADD CONSTRAINT "categoria_especie_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "especie" ADD CONSTRAINT "especie_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
