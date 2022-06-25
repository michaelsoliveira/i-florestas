import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseModel } from "./BaseEntity";
import { Motorista } from "./Motorista";

// @Index("tipo_motorista_pkey", ["idTipo"], { unique: true })
@Entity("tipo_motorista", { schema: "public" })
export class TipoMotorista extends BaseModel {
  // @Column("bigint", { primary: true, name: "id_tipo" })
  // idTipo: string;

  @Column({
    name: "descricao",
    nullable: true,
    length: 30,
  })
  descricao: string;

  // @OneToMany(() => Motorista, (motorista) => motorista.tipoMotorista)
  // motoristas: Motorista[];
}
