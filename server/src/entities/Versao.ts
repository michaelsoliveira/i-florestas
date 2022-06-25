import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseEntity";

@Entity("versao", { schema: "public" })
export class Versao extends BaseModel {
  @Column("character varying", { name: "numero", nullable: true, length: 5 })
  numero: string | null;
}
