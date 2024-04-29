-- DropForeignKey
ALTER TABLE "categoria_especie_poa" DROP CONSTRAINT "categoria_especie_poa_id_especie_fkey";

-- AddForeignKey
ALTER TABLE "categoria_especie_poa" ADD CONSTRAINT "categoria_especie_poa_id_especie_fkey" FOREIGN KEY ("id_especie") REFERENCES "especie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
