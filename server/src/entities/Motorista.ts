import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoMotorista } from "./TipoMotorista";
import { Saida } from "./Saida";
import { BaseModel } from "./BaseEntity";

// @Index("motorista_pkey", ["idMotorista"], { unique: true })
@Entity("motorista", { schema: "public" })
export class Motorista extends BaseModel {
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_motorista" })
  // idMotorista: string;

  @Column({ name: "nome", nullable: true, length: 55 })
  nome: string;

  @Column({
    name: "endereco",
    nullable: true,
    length: 250,
  })
  endereco: string;

  @Column({ name: "telefone", nullable: true, length: 10 })
  telefone: string;

  @Column({ name: "celular", nullable: true, length: 11 })
  celular: string;

  @Column({
    name: "habilitacao",
    nullable: true,
    length: 20,
  })
  habilitacao: string;

  // @ManyToOne(() => TipoMotorista, (tipoMotorista) => tipoMotorista.motoristas)
  // @JoinColumn([{ name: "id_tipo_motorista", referencedColumnName: "id" }])
  // tipoMotorista: TipoMotorista;

  @OneToMany(() => Saida, (saida) => saida.motorista)
  saidas: Saida[];
}
