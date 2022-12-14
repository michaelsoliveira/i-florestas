/*
  Warnings:

  - You are about to drop the `typeorm_metadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "typeorm_metadata";

-- CreateTable
CREATE TABLE "situacao_arvore" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" TEXT,

    CONSTRAINT "situacao_arvore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "motivo_preservacao" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" TEXT,

    CONSTRAINT "motivo_preservacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observacao_arvore" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" TEXT,
    "preservar" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "observacao_arvore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arvore" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numero_arvore" INTEGER NOT NULL,
    "dap" DOUBLE PRECISION,
    "altura" DOUBLE PRECISION,
    "fuste" INTEGER,
    "area_basal" DOUBLE PRECISION,
    "volume" DOUBLE PRECISION,
    "comentario" TEXT,
    "orient_x" CHAR(1),
    "lat_x" DOUBLE PRECISION,
    "long_y" DOUBLE PRECISION,
    "faixa" INTEGER,
    "gps" INTEGER,
    "derrubada" BOOLEAN NOT NULL DEFAULT false,
    "secoes" INTEGER,
    "ponto_arvore" geometry,
    "ponto_gps" INTEGER,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "id_ut" UUID,
    "id_especie" UUID,
    "id_situacao" UUID,
    "id_motivo_preservacao" UUID,
    "id_observacao" UUID,

    CONSTRAINT "arvore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "arvore_id_ut_key" ON "arvore"("id_ut");

-- CreateIndex
CREATE UNIQUE INDEX "arvore_id_especie_key" ON "arvore"("id_especie");

-- CreateIndex
CREATE UNIQUE INDEX "arvore_id_situacao_key" ON "arvore"("id_situacao");

-- CreateIndex
CREATE UNIQUE INDEX "arvore_id_motivo_preservacao_key" ON "arvore"("id_motivo_preservacao");

-- CreateIndex
CREATE UNIQUE INDEX "arvore_id_observacao_key" ON "arvore"("id_observacao");

-- AddForeignKey
ALTER TABLE "arvore" ADD CONSTRAINT "arvore_id_situacao_fkey" FOREIGN KEY ("id_situacao") REFERENCES "situacao_arvore"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "arvore" ADD CONSTRAINT "arvore_id_motivo_preservacao_fkey" FOREIGN KEY ("id_motivo_preservacao") REFERENCES "motivo_preservacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "arvore" ADD CONSTRAINT "arvore_id_observacao_fkey" FOREIGN KEY ("id_observacao") REFERENCES "observacao_arvore"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "arvore" ADD CONSTRAINT "arvore_id_especie_fkey" FOREIGN KEY ("id_especie") REFERENCES "especie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "arvore" ADD CONSTRAINT "arvore_id_ut_fkey" FOREIGN KEY ("id_ut") REFERENCES "ut"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
