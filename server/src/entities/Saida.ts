import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comprador } from "./Comprador";
import { DestinoTora } from "./DestinoTora";
import { Motorista } from "./Motorista";
import { Poa } from "./Poa";
import { Veiculo } from "./Veiculo";
import { Tora } from "./Tora";
import { BaseModel } from "./BaseEntity";

@Index("saida_pkey", ["idSaida"], { unique: true })
@Entity("saida", { schema: "public" })
export class Saida extends BaseModel {
  // @PrimaryGeneratedColumn({ type: "bigint", name: "id_saida" })
  // idSaida: string;

  @Column({ name: "data_saida", nullable: true })
  dataSaida: string | null;

  @Column({ name: "dof", nullable: true, length: 40 })
  dof: string;

  @Column({ name: "nf", nullable: true, length: 40 })
  nf: string;

  @Column({ name: "data_vencimento_dof", nullable: true })
  dataVencimentoDof: Date;

  @Column({ name: "agf", nullable: true, length: 40 })
  agf: string;

  @Column({ name: "data_vencimento_agf", nullable: true })
  dataVencimentoAgf: Date;

  @ManyToOne(() => Comprador, (comprador) => comprador.saidas)
  @JoinColumn([{ name: "id_comprador", referencedColumnName: "id" }])
  comprador: Comprador;

  @ManyToOne(() => DestinoTora, (destinoTora) => destinoTora.saidas)
  @JoinColumn([{ name: "id_destino", referencedColumnName: "destino" }])
  destino: DestinoTora;

  @ManyToOne(() => Motorista, (motorista) => motorista.saidas)
  @JoinColumn([{ name: "id_motorista", referencedColumnName: "id" }])
  motorista: Motorista;

  // @ManyToOne(() => Poa, (poa) => poa.saidas)
  // @JoinColumn([{ name: "id_poa", referencedColumnName: "id" }])
  // poa: Poa;

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.saidas)
  @JoinColumn([{ name: "id_veiculo", referencedColumnName: "id" }])
  veiculo: Veiculo;

  @OneToMany(() => Tora, (tora) => tora.saida)
  toras: Tora[];
}
