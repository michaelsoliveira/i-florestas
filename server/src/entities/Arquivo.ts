import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("arquivos_pkey", ["idArquivo"], { unique: true })
@Entity("arquivo", { schema: "public" })
export class Arquivo {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_arquivo" })
  idArquivo: string;

  @Column("text", { name: "nome", nullable: true })
  nome: string | null;

  @Column("bytea", { name: "arquivo", nullable: true })
  arquivo: Buffer | null;
}
