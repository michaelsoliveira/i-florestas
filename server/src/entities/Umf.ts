import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import { BaseModel } from "./BaseEntity";
import { Empresa } from "./Empresa";
import { Estado } from "./Estado";
import { Upa } from "./Upa";
@Entity("umf")
export class Umf extends BaseModel {

  @Column({ name: "nome", length: 50 })
  nome: string;

  @Column({
    nullable: true,
  })
  municipio: string;

  @Column({
    name: "localizacao",
    nullable: true,
    length: 50,
  })
  localizacao: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.umfs)
  @JoinColumn([{ name: "id_empresa", referencedColumnName: "id" }])
  empresa: Empresa;

  @ManyToOne(() => Estado, (estado) => estado.umfs)
  @JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
  estado: Estado;

  @OneToMany(() => Upa, (upa) => upa.umf)
  upas: Upa[];
}
