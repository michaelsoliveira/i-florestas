-- DropForeignKey
ALTER TABLE "pessoa" DROP CONSTRAINT "pessoa_id_pessoa_fisica_fkey";

-- DropForeignKey
ALTER TABLE "pessoa" DROP CONSTRAINT "pessoa_id_pessoa_juridica_fkey";

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_pessoa_fisica_fkey" FOREIGN KEY ("id_pessoa_fisica") REFERENCES "pessoa_fisica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_id_pessoa_juridica_fkey" FOREIGN KEY ("id_pessoa_juridica") REFERENCES "pessoa_juridica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
