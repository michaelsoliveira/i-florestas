CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CreateTable
CREATE TABLE "categoria_especie" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" VARCHAR(50),
    "criterio_fuste" SMALLINT,
    "criterio_dminc" SMALLINT,
    "criterio_dmaxc" SMALLINT,
    "criterio_n_min" SMALLINT,
    "criterio_perc_min" SMALLINT,
    "preservar" BOOLEAN,
    "criterio_altura" DOUBLE PRECISION,
    "criterio_volume" DOUBLE PRECISION,

    CONSTRAINT "PK_2b252e9ab67497cb87a50f1e534" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresa" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "razao_social" VARCHAR(100) NOT NULL,
    "nome_fantasia" VARCHAR(100),
    "cnpj" VARCHAR(14),
    "reg_ambiental" VARCHAR(50),
    "telefone" VARCHAR(10),
    "endereco" VARCHAR(60),
    "complemento" VARCHAR(40),
    "cep" VARCHAR(8),
    "municipio" VARCHAR(30),
    "estado" VARCHAR(2),
    "contato" VARCHAR(50),
    "resp_tecnico" VARCHAR(50),
    "crea_resp" VARCHAR(50),
    "dmin_relatorio" INTEGER,
    "intervalo_dmin_relatorio" INTEGER,

    CONSTRAINT "PK_bee78e8f1760ccf9cff402118a6" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresa_users" (
    "id_empresa" UUID NOT NULL,
    "id_user" UUID NOT NULL,

    CONSTRAINT "PK_57c5338b1a54ea499a79c1286f2" PRIMARY KEY ("id_empresa","id_user")
);

-- CreateTable
CREATE TABLE "endereco" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cep" VARCHAR(8),
    "logradouro" VARCHAR(60),
    "municipio" VARCHAR(30),
    "estado" VARCHAR(2),
    "bairro" VARCHAR(50),
    "id_empresa" UUID,

    CONSTRAINT "PK_2a6880f71a7f8d1c677bb2a32a8" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "especie" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" VARCHAR(50),
    "nome_orgao" VARCHAR(50),
    "nome_cientifico" VARCHAR(100),
    "id_categoria" UUID,

    CONSTRAINT "PK_07fb45be286aefa181943248b21" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions_roles" (
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,

    CONSTRAINT "PK_838ed6e68b01d6912fa682bedef" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "projeto" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" VARCHAR NOT NULL,
    "id_empresa" UUID,

    CONSTRAINT "PK_87de7c3af72f824a860298c3c3e" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_in" INTEGER NOT NULL,
    "token" VARCHAR NOT NULL,
    "id_user" UUID,

    CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeorm_metadata" (
    "type" VARCHAR NOT NULL,
    "database" VARCHAR,
    "schema" VARCHAR,
    "table" VARCHAR,
    "name" VARCHAR,
    "value" TEXT
);

-- CreateTable
CREATE TABLE "umf" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" VARCHAR(50) NOT NULL,
    "municipio" TEXT,
    "localizacao" VARCHAR(50),
    "id_empresa" UUID,
    "id_estado" UUID,

    CONSTRAINT "PK_fc13d7f2c91d3fc3ea2dd802120" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upa" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ano" INTEGER NOT NULL,
    "descricao" VARCHAR(50),
    "equacao_volume_arvore" VARCHAR(1000),
    "equacao_abasal_arvore" VARCHAR(1000),
    "tipo" INTEGER,
    "sys_ref_coord" VARCHAR(100),
    "epsg" INTEGER,
    "id_umf" UUID,

    CONSTRAINT "PK_8beec4503af75eabc74b6f33c8e" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "provider" VARCHAR,
    "id_provider" VARCHAR,
    "image" VARCHAR,
    "email_verified" TIMESTAMP(3),

    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_permissions" (
    "user_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,

    CONSTRAINT "PK_7f3736984cd8546a1e418005561" PRIMARY KEY ("user_id","permission_id")
);

-- CreateTable
CREATE TABLE "users_roles" (
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,

    CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "ut" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numero_ut" INTEGER NOT NULL,
    "area_util" DOUBLE PRECISION,
    "quantidade_faixas" INTEGER,
    "largura_faixas" INTEGER,
    "comprimento_faixas" INTEGER,
    "area_total" DOUBLE PRECISION,
    "azimute" DOUBLE PRECISION,
    "quadrante" INTEGER,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "shapefile" BYTEA,
    "origem" geometry,
    "id_upa" UUID,

    CONSTRAINT "PK_887e89703ecfebb1f7b8b7006a3" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "uf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ddd" SMALLINT,

    CONSTRAINT "estado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_9197746d4fec9555520a45d1ad" ON "empresa_users"("id_empresa");

-- CreateIndex
CREATE INDEX "IDX_ea3cb7162981b687e4daa856bf" ON "empresa_users"("id_user");

-- CreateIndex
CREATE INDEX "IDX_3309f5fa8d95935f0701027f2b" ON "permissions_roles"("permission_id");

-- CreateIndex
CREATE INDEX "IDX_e08f6859eaac8cbf7f087f64e2" ON "permissions_roles"("role_id");

-- CreateIndex
CREATE INDEX "IDX_4de7d0b175f702be3be5527002" ON "users_permissions"("user_id");

-- CreateIndex
CREATE INDEX "IDX_b09b9a210c60f41ec7b453758e" ON "users_permissions"("permission_id");

-- CreateIndex
CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles"("role_id");

-- CreateIndex
CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- AddForeignKey
ALTER TABLE "empresa_users" ADD CONSTRAINT "FK_9197746d4fec9555520a45d1ad0" FOREIGN KEY ("id_empresa") REFERENCES "empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empresa_users" ADD CONSTRAINT "FK_ea3cb7162981b687e4daa856bf1" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "FK_a72fa0a052cd28afba4a0e776c5" FOREIGN KEY ("id_empresa") REFERENCES "empresa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "especie" ADD CONSTRAINT "FK_b6c8cdf66e1a2b50baa526c0281" FOREIGN KEY ("id_categoria") REFERENCES "categoria_especie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permissions_roles" ADD CONSTRAINT "FK_3309f5fa8d95935f0701027f2bd" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions_roles" ADD CONSTRAINT "FK_e08f6859eaac8cbf7f087f64e2b" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projeto" ADD CONSTRAINT "FK_5c89069177d3ac18f7e268e7b07" FOREIGN KEY ("id_empresa") REFERENCES "empresa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_fd79923e4359a26a971f841fb5e" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "umf" ADD CONSTRAINT "umf_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "umf" ADD CONSTRAINT "umf_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "estado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "upa" ADD CONSTRAINT "FK_b88118f4ad5bc32837c3873a56f" FOREIGN KEY ("id_umf") REFERENCES "umf"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_permissions" ADD CONSTRAINT "FK_b09b9a210c60f41ec7b453758e9" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_permissions" ADD CONSTRAINT "FK_4de7d0b175f702be3be55270023" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ut" ADD CONSTRAINT "FK_cb45ccb0356c31c3bf2f00b0086" FOREIGN KEY ("id_upa") REFERENCES "upa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
