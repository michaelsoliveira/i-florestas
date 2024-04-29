-- AlterTable
ALTER TABLE "arvore" ADD COLUMN     "motivo_nao_derrubada" VARCHAR(120),
ADD COLUMN     "substituida" BOOLEAN NOT NULL DEFAULT false;
