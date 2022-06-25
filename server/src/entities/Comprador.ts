import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { BaseModel } from "./BaseEntity";
import { Pessoa } from "./Pessoa";
import { Saida } from "./Saida";

@Index("comprador_pkey", ["idComprador"], { unique: true })
@Entity("comprador", { schema: "public" })
export class Comprador extends BaseModel {
  // @Column("integer", { primary: true, name: "id_comprador" })
  // idComprador: number;

  @OneToOne(() => Pessoa, (pessoa) => pessoa.comprador)
  @JoinColumn([{ name: "id_pessoa", referencedColumnName: "id" }])
  pessoa: Pessoa;

  @OneToMany(() => Saida, (saida) => saida.comprador)
  saidas: Saida[];
}
