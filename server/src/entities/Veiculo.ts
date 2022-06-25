import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseModel } from "./BaseEntity";
import { Saida } from "./Saida";

// @Index("caminhao_pkey", ["idVeiculo"], { unique: true })
@Entity("veiculo", { schema: "public" })
export class Veiculo extends BaseModel {
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_veiculo" })
  // idVeiculo: string;

  @Column({ name: "placa", nullable: true, length: 8 })
  placa: string;

  @Column({
    name: "descricao",
    nullable: true,
    length: 250,
  })
  descricao: string;

  @OneToMany(() => Saida, (saida) => saida.veiculo)
  saidas: Saida[];
}
