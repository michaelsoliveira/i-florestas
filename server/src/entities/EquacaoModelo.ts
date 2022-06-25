import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// @Index("equacao_modelo_pkey", ["equacaoModeloId"], { unique: true })
@Entity("equacao_modelo", { schema: "public" })
export class EquacaoModelo {
  @PrimaryGeneratedColumn({ type: "bigint", name: "equacao_modelo_id" })
  equacaoModeloId: string;

  @Column("character varying", {
    name: "expressao",
    nullable: true,
    length: 1000,
  })
  expressao: string | null;

  @Column("character varying", { name: "nome", nullable: true, length: 50 })
  nome: string | null;

  @Column("integer", { name: "tipo", nullable: true })
  tipo: number | null;
}
