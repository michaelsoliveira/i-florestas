import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseModel } from "./BaseEntity";
import { Poa } from "./Poa";

// @Index("situacao_poa_pkey", ["idSituacao"], { unique: true })
@Entity("situacao_poa", { schema: "public" })
export class SituacaoPoa extends BaseModel {
  // @Column("bigint", { primary: true, name: "id_situacao" })
  // idSituacao: string;

  @Column({ name: "nome", nullable: true, length: 21 })
  nome: string;

  // @OneToMany(() => Poa, (poa) => poa.id)
  // poas: Poa[];
}
