import { Column, Entity, Index } from "typeorm";

@Index("tipo_parametro_pkey", ["idTipoParametro"], { unique: true })
@Entity("tipo_parametro", { schema: "public" })
export class TipoParametro {
  @Column("integer", { primary: true, name: "id_tipo_parametro" })
  idTipoParametro: number;

  @Column("character varying", { name: "nome", nullable: true, length: 50 })
  nome: string | null;
}
