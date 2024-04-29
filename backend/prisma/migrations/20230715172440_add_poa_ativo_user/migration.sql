-- DropForeignKey
ALTER TABLE "categoria_especie_poa" DROP CONSTRAINT "categoria_especie_poa_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "categoria_especie_poa" DROP CONSTRAINT "categoria_especie_poa_id_especie_fkey";

-- AddForeignKey
ALTER TABLE "categoria_especie_poa" ADD CONSTRAINT "categoria_especie_poa_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria_especie"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoria_especie_poa" ADD CONSTRAINT "categoria_especie_poa_id_especie_fkey" FOREIGN KEY ("id_especie") REFERENCES "especie"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
