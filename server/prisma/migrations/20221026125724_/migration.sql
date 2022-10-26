-- AlterTable
ALTER TABLE "umf" ADD COLUMN     "id_projeto" UUID;

-- AddForeignKey
ALTER TABLE "umf" ADD CONSTRAINT "umf_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
