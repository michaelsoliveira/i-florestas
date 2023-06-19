-- AlterTable
ALTER TABLE "categoria_especie" ADD COLUMN     "id_poa" UUID;

-- AddForeignKey
ALTER TABLE "categoria_especie" ADD CONSTRAINT "categoria_especie_id_poa_fkey" FOREIGN KEY ("id_poa") REFERENCES "poa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
