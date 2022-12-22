-- AlterTable
ALTER TABLE "users_roles" ADD COLUMN     "id_projeto" UUID;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "FK_ea3cb7162981b687e4daa856bf0" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
