import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseEntity";

@Entity("configuracoes", { schema: "public" })
export class Configuracoes extends BaseModel {
  @Column("character varying", {
    name: "modo_acesso",
    nullable: true,
    length: 6,
  })
  modoAcesso: string | null;

  @Column("character varying", {
    name: "endereco_host",
    nullable: true,
    length: 15,
  })
  enderecoHost: string | null;

  @Column("smallint", { name: "dap_min", nullable: true })
  dapMin: number | null;

  @Column("smallint", { name: "dap_max", nullable: true })
  dapMax: number | null;

  @Column("smallint", { name: "alt_min", nullable: true })
  altMin: number | null;

  @Column("smallint", { name: "alt_max", nullable: true })
  altMax: number | null;

  @Column("smallint", { name: "diam_min", nullable: true })
  diamMin: number | null;

  @Column("smallint", { name: "diam_max", nullable: true })
  diamMax: number | null;

  @Column("smallint", { name: "comp_min", nullable: true })
  compMin: number | null;

  @Column("smallint", { name: "comp_max", nullable: true })
  compMax: number | null;
}
