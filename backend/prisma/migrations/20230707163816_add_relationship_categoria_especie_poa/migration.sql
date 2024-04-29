-- DropForeignKey
ALTER TABLE "especie" DROP CONSTRAINT "FK_b6c8cdf66e1a2b50baa526c0281";

-- CreateTable
CREATE TABLE "categoria_especie_poa" (
    "id_categoria" UUID NOT NULL,
    "id_especie" UUID NOT NULL,

    CONSTRAINT "categoria_especie_poa_pkey" PRIMARY KEY ("id_categoria","id_especie")
);

-- CreateIndex
CREATE INDEX "categoria_especie_poa_id_categoria_idx" ON "categoria_especie_poa"("id_categoria");

-- CreateIndex
CREATE INDEX "categoria_especie_poa_id_especie_idx" ON "categoria_especie_poa"("id_especie");

-- AddForeignKey
ALTER TABLE "categoria_especie_poa" ADD CONSTRAINT "categoria_especie_poa_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria_especie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoria_especie_poa" ADD CONSTRAINT "categoria_especie_poa_id_especie_fkey" FOREIGN KEY ("id_especie") REFERENCES "especie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
