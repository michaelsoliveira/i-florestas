import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseEntity";

@Entity("status", { schema: "public" })
export class Status extends BaseModel {
  @Column("smallint", { name: "id_status", nullable: true })
  idStatus: number | null;
}
