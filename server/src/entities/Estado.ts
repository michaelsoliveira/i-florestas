import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Umf } from "./Umf";

@Entity("estado")
export class Estado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: "uf" })
  uf: string;

  @Column({ name: "nome" })
  nome: string;

  @Column({ name: "ddd", nullable: true })
  ddd: number;

  @OneToMany(() => Umf, (umf) => umf.estado)
  umfs: Umf[];
}
