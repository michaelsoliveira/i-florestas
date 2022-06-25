import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "./BaseEntity";
import { Upa } from "./Upa";

// @Index("equacao_pkey", ["idEquacao"], { unique: true })
@Entity("equacao_volume", { schema: "public" })
export class EquacaoVolume extends BaseModel {
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_equacao" })
  // idEquacao: string;

  @Column("character varying", { name: "nome", nullable: true, length: 50 })
  nome: string | null;

  @Column("character varying", {
    name: "observacao",
    nullable: true,
    length: 200,
  })
  observacao: string | null;

  @Column("character varying", {
    name: "expressao",
    nullable: true,
    length: 1000,
  })
  expressao: string | null;

  @OneToMany(() => Upa, (upa) => upa.equacaoVolume)
  upa: Upa[];
}
