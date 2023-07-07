-- AlterTable
ALTER TABLE "motivo_preservacao" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "motivo_preservacao_id_seq";

-- AlterTable
ALTER TABLE "situacao_arvore" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "situacao_arvore_id_seq";
