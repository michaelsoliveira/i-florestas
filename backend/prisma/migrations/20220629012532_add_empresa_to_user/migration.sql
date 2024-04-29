-- AlterTable
ALTER TABLE "ut" ADD COLUMN     "id_empresa" UUID;

-- AddForeignKey
ALTER TABLE "ut" ADD CONSTRAINT "ut_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
