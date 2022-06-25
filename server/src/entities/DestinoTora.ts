import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoDestino } from "./TipoDestino";
import { Saida } from "./Saida";
import { Tora } from "./Tora";
import { BaseModel } from "./BaseEntity";

// @Index("destino_tora_pkey", ["idDestino"], { unique: true })
@Index("uk_nome_tora", ["nome"], { unique: true })
@Entity("destino_tora", { schema: "public" })
export class DestinoTora extends BaseModel {
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_destino" })
  // idDestino: string;

  @Column("character varying", {
    name: "descricao",
    nullable: true,
    length: 40,
  })
  descricao: string;

  // @Column({
  //   name: "data_atualizacao",
  //   nullable: true,
  // })
  // dataAtualizacao: Date;

  // @Column("timestamp without time zone", {
  //   name: "data_cadastro",
  //   nullable: true,
  // })
  // dataCadastro: Date;

  @Column({
    name: "nome",
    nullable: true,
    unique: true,
    length: 50,
  })
  nome: string | null;

  @ManyToOne(() => TipoDestino, (tipoDestino) => tipoDestino.destinoToras)
  @JoinColumn([
    { name: "id_tipo_destino", referencedColumnName: "id" },
  ])
  tipoDestino: TipoDestino;

  @OneToMany(() => Saida, (saida) => saida.destino)
  saidas: Saida[];

  @OneToMany(() => Tora, (tora) => tora.destino)
  toras: Tora[];
}
