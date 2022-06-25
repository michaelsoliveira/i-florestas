import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseEntity";

@Entity("teste_equacao", { schema: "public" })
export class TesteEquacao extends BaseModel {

  @Column("double precision", { name: "volume", nullable: true, precision: 53 })
  volume: number | null;

  @Column("double precision", { name: "dap", nullable: true, precision: 53 })
  dap: number | null;

  @Column("double precision", { name: "altura", nullable: true, precision: 53 })
  altura: number | null;

  @Column("double precision", {
    name: "area_basal",
    nullable: true,
    precision: 53,
  })
  areaBasal: number | null;
}
