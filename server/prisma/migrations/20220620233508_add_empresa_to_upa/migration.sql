/*
  Warnings:

  - You are about to drop the column `equacao_abasal_arvore` on the `upa` table. All the data in the column will be lost.
  - You are about to drop the column `equacao_volume_arvore` on the `upa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "upa" DROP COLUMN "equacao_abasal_arvore",
DROP COLUMN "equacao_volume_arvore",
ADD COLUMN     "id_empresa" UUID,
ADD COLUMN     "id_equacao_volume" UUID;

-- CreateTable
CREATE TABLE "equacao_modelo" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" TEXT NOT NULL,
    "expressao" VARCHAR(100) NOT NULL,
    "id_empresa" UUID NOT NULL,

    CONSTRAINT "equacao_modelo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equacao_volume" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" TEXT NOT NULL,
    "expressao" VARCHAR(100) NOT NULL,
    "id_empresa" UUID NOT NULL,
    "observacao" TEXT,

    CONSTRAINT "equacao_volume_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "upa" ADD CONSTRAINT "upa_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "upa" ADD CONSTRAINT "upa_id_equacao_volume_fkey" FOREIGN KEY ("id_equacao_volume") REFERENCES "equacao_volume"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equacao_modelo" ADD CONSTRAINT "equacao_modelo_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equacao_volume" ADD CONSTRAINT "equacao_volume_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
