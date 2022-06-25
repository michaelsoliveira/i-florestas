import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseModel } from "./BaseEntity";
import { Empresa } from "./Empresa";

@Entity("endereco")
export class Endereco extends BaseModel {

  @Column({ name: "cep", nullable: true, length: 8 })
  cep: string;

  @Column({ name: "logradouro", nullable: true, length: 60 })
  endereco: string;

  @Column({
    name: "municipio",
    nullable: true,
    length: 30,
  })
  municipio: string;

  @Column({ name: "estado", nullable: true, length: 2 })
  estado: string;

  @Column({ name: "bairro", nullable: true, length: 50 })
  bairro: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.enderecos)
  @JoinColumn([
    { name: "id_empresa", referencedColumnName: "id" }
  ])
  empresa: Empresa
}
