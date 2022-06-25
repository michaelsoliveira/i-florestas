import { Column, Entity, Index } from "typeorm";

@Index("uk_tfch6qwaswg8ho9n05wa36evf", ["codigo"], { unique: true })
@Index("parametro_pkey", ["idParametro"], { unique: true })
@Entity("parametro", { schema: "public" })
export class Parametro {
  @Column("integer", { primary: true, name: "id_parametro" })
  idParametro: number;

  @Column("character varying", {
    name: "codigo",
    nullable: true,
    unique: true,
    length: 255,
  })
  codigo: string | null;

  @Column("date", { name: "data_execucao", nullable: true })
  dataExecucao: string | null;

  @Column("character varying", {
    name: "descricao",
    nullable: true,
    length: 50,
  })
  descricao: string | null;

  @Column("integer", { name: "realizado" })
  realizado: number;

  @Column("character varying", {
    name: "tipo_parametro",
    nullable: true,
    length: 20,
  })
  tipoParametro: string | null;
}
