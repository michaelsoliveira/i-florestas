-- DropForeignKey
ALTER TABLE "pessoa_fisica" DROP CONSTRAINT "pessoa_fisica_id_pessoa_fkey";

-- AddForeignKey
ALTER TABLE "pessoa_fisica" ADD CONSTRAINT "pessoa_fisica_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
